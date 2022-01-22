package graphql

import (
	"context"
	"fmt"

	"entgo.io/contrib/entgql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"go.uber.org/zap"

	"github.com/kucera-lukas/stegoer/ent"
	"github.com/kucera-lukas/stegoer/pkg/adapter/controller"
	"github.com/kucera-lukas/stegoer/pkg/adapter/resolver"
	"github.com/kucera-lukas/stegoer/pkg/entity/model"
)

const complexityLimit = 1000

// NewServer generates a new handler.Server.
func NewServer(
	logger *zap.SugaredLogger,
	client *ent.Client,
	controller controller.Controller,
) *handler.Server {
	srv := handler.NewDefaultServer(resolver.NewSchema(logger, client, controller))
	srv.Use(entgql.Transactioner{TxOpener: client})
	srv.Use(extension.Introspection{})
	srv.Use(extension.FixedComplexityLimit(complexityLimit))
	srv.SetRecoverFunc(func(ctx context.Context, err interface{}) error {
		return model.NewInternalServerError(ctx, fmt.Sprintf(`%v`, err))
	})

	return srv
}
