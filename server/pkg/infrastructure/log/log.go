package log

import (
	"log"

	"go.uber.org/zap"

	"github.com/kucera-lukas/stegoer/pkg/infrastructure/env"
)

func New(config *env.Config) *zap.SugaredLogger {
	cfg := updateConfig(getConfig(config))

	logger, err := cfg.Build()
	if err != nil {
		log.Panicf("can't initialize logger: %v", err)
	}

	sugar := logger.Sugar()
	sugar.Infof("logger initialized, development: %t", cfg.Development)

	return sugar
}

func Sync(logger *zap.SugaredLogger) {
	if err := logger.Sync(); err != nil {
		log.Panicf("failed to sync logger: %v", err)
	}
}

func getConfig(config *env.Config) (cfg zap.Config) {
	switch config.Debug {
	case true:
		cfg = zap.NewDevelopmentConfig()
	case false:
		cfg = zap.NewProductionConfig()
	}

	return
}

func updateConfig(cfg zap.Config) zap.Config {
	cfg.Level = zap.NewAtomicLevelAt(zap.DebugLevel)
	cfg.Encoding = "console"

	return cfg
}
