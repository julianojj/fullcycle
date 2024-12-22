package slog

import (
	"log/slog"
	"os"
)

func Init() {
	jsonHandler := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		AddSource: true,
		Level:     slog.LevelInfo,
	})
	logger := slog.New(jsonHandler)
	slog.SetDefault(logger)
}
