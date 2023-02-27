package main

import (
	"context"
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	stats := NewMyStatsBackend()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "CPU & Disk Usage",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup: func(ctx context.Context) {
			app.startup(ctx)
			stats.startup(ctx)
		},
		Bind: []interface{}{
			app,
			stats,
		},
	})

	if err != nil {
		log.Fatalf("Error al iniciar la aplicación: %s", err)
	}
}
