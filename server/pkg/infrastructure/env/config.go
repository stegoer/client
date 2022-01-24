package env

import (
	"fmt"
	"log"
	"os"

	_ "github.com/joho/godotenv/autoload" // load .env variables
	"github.com/spf13/viper"
)

const configPath = "."

// Config represents the env configuration.
type Config struct {
	Debug       bool   `mapstructure:"DEBUG"`
	Port        int    `mapstructure:"PORT"`
	SecretKey   string `mapstructure:"SECRET_KEY"`
	DatabaseURL string `mapstructure:"DATABASE_URL"`
}

// Load loads and returns the env.Config struct.
func Load() *Config {
	config, err := load(configPath)
	if err != nil {
		log.Panicf("failed to load config: %v", err)
	}

	return config
}

func load(path string) (*Config, error) {
	if os.Getenv("ENV") != "PRODUCTION" {
		if err := setConfig(path); err != nil {
			return nil, err
		}
	}

	setDefault()

	config := Config{} //nolint:exhaustivestruct

	if err := viper.Unmarshal(&config); err != nil {
		return nil, fmt.Errorf(`error unmarshaling config: %w`, err)
	}

	return &config, nil
}

func setConfig(path string) error {
	viper.AddConfigPath(path)
	viper.SetConfigName(".env")
	viper.SetConfigType("env")
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		return fmt.Errorf(`error reading configuration: %w`, err)
	}
	return nil
}

func setDefault() {
	viper.SetDefault("ENV", os.Getenv("ENV"))
	viper.SetDefault("DEBUG", false)
	viper.SetDefault("PORT", os.Getenv("PORT"))
	viper.SetDefault("SECRET_KEY", os.Getenv("SECRET_KEY"))
	viper.SetDefault("DATABASE_URL", os.Getenv("DATABASE_URL"))
}
