package main

import (
	"factory-calc/back/game_data"
	"factory-calc/back/game_data/processed/classes"
	"factory-calc/back/image_download"
	"log"
	"path/filepath"
)

func main() {
	s, err := filepath.Abs("../../game_data/update7/Docs.json")
	if err != nil {
		log.Fatal(err)
	}
	e, err := game_data.NewExtractor(s)
	if err != nil {
		log.Fatal(err)
	}

	items := e.GetItems()

	d := image_download.NewDownloader("../../front/dist/images/items", convertToStringList(items))
	d.DownloadAll()
}

func convertToStringList(items []classes.ItemDescriptor) []string {
	var strings []string
	for _, item := range items {
		strings = append(strings, item.DisplayName)
	}

	return strings
}
