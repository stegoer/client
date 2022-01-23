package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"go.uber.org/zap"

	"github.com/kucera-lukas/stegoer/ent"
	"github.com/kucera-lukas/stegoer/ent/migrate"
	"github.com/kucera-lukas/stegoer/pkg/adapter/controller"
	"github.com/kucera-lukas/stegoer/pkg/adapter/repository"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/client"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/env"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/graphql"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/router"
)

const (
	timeOutDeadline = time.Second * 30
	shutdownSignal  = 1
)

// Run runs the server with the given env.Config configuration.
func Run(logger *zap.SugaredLogger, config *env.Config) {
	srv := create(logger, config)
	run(logger, srv)
}

func create(logger *zap.SugaredLogger, config *env.Config) *http.Server {
	entClient := newDBClient(logger, config)
	ctrl := newController(entClient)

	gqlSrv := graphql.NewServer(logger, entClient, ctrl)
	muxRouter := router.New(config, gqlSrv, entClient)

	return &http.Server{ //nolint:exhaustivestruct
		Addr:         fmt.Sprintf(`:%d`, config.ServerPort),
		WriteTimeout: timeOutDeadline,
		ReadTimeout:  timeOutDeadline,
		IdleTimeout:  timeOutDeadline,
		Handler:      muxRouter,
	}
}

func run(logger *zap.SugaredLogger, srv *http.Server) {
	// Run our server in a goroutine so that it doesn't block.
	go func() {
		logger.Infof("listening on %s", srv.Addr)

		if err := srv.ListenAndServe(); err != nil {
			logger.Infof("http server terminated: %v", err)
		}
	}()

	channel := make(chan os.Signal, shutdownSignal)
	// We'll accept graceful shutdowns when quit via SIGINT (Ctrl+C)
	// SIGKILL, SIGQUIT or SIGTERM (Ctrl+/) will not be caught.
	signal.Notify(channel, os.Interrupt)

	// Block until we receive our signal.
	<-channel

	// Create a deadline to wait for.
	ctx, cancel := context.WithTimeout(context.Background(), timeOutDeadline)
	defer cancel()

	// Doesn't block if no connections, but will otherwise wait
	// until the timeout deadline.
	if err := srv.Shutdown(ctx); err != nil {
		logger.Panicf("error shutting down the server: %v", err)
	}

	logger.Info("server shutdown")
}

func newDBClient(logger *zap.SugaredLogger, config *env.Config) *ent.Client {
	entClient, err := client.New(config)
	if err != nil {
		logger.Panicf("failed to open postgres client: %v", err)
	}

	if err := entClient.Schema.Create(
		context.Background(),
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
		migrate.WithForeignKeys(true),
	); err != nil {
		logger.Panicf("failed to create schema resources: %v", err)
	}

	return entClient
}

func newController(client *ent.Client) controller.Controller {
	return controller.Controller{
		User:  repository.NewUserRepository(client),
		Image: repository.NewImageRepository(client),
	}
}
