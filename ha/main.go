package main

import (
	"ae/cmd"
	"ae/pkg/slog"
)

func main() {
	slog.Init()
	cmd.Execute()
}
