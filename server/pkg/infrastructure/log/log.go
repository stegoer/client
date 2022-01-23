package log

import (
	"log"

	"go.uber.org/zap"
)

func New() *zap.SugaredLogger {
	logger, err := zap.NewProduction()
	sugar := logger.Sugar()

	if err != nil {
		sugar.Panicf("can't initialize logger: %v", err)
	}

	return sugar
}

func Sync(logger *zap.SugaredLogger) {
	if err := logger.Sync(); err != nil {
		log.Panicf("failed to sync logger: %v", err)
	}
}
