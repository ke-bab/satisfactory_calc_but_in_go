package main

import (
	"factory-calc/back/game_data"
	"factory-calc/back/game_data/raw/classes"
	"factory-calc/back/image_download"
	"log"
	"path/filepath"
)

func main() {
	s, err := filepath.Abs("../../game_data/update7/Docs.json")
	if err != nil {
		log.Fatal(err)
	}
	e := game_data.NewExtractor(s)
	e.ExtractRaw()

	first := e.RawData.NativeClasses[0].Classes[0]
	if v, ok := first.(classes.ItemDescriptor); ok {

		println("classname: " + v.ClassName)
	}

	return

	d := image_download.NewDownloader("../../front/dist/images/items", []string{
		"Uranium Waste",
		"Supercomputer",
	})
	d.DownloadAll()
}
