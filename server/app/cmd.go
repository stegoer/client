package main

import (
	"Stegoer/pkg/infrastructure/env"
	"Stegoer/pkg/infrastructure/server"
)

func main() {
	config := env.LoadConfig()
	server.Run(config)
}
