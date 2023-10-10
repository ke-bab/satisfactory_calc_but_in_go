package main

import (
	"factory-calc/back/image_download"
)

func main() {
	d := image_download.NewDownloader("../../front/dist/images/items", []string{
		"Uranium Waste",
		"Supercomputer",
	})
	d.DownloadAll()
}
