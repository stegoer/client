package main

import (
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/env"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/log"
	"github.com/kucera-lukas/stegoer/pkg/infrastructure/server"
)

func main() {
	logger := log.New()
	config := env.Load(logger)
	server.Run(logger, config)
}
