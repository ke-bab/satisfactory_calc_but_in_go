package image_download

import "log"

const baseWikiUrl = "https://satisfactory.wiki.gg/wiki/"
const baseUrl = "https://satisfactory.wiki.gg/"

type Downloader struct {
	OutputPath string
	ItemNames  []string
}

// NewDownloader downloads images for part from https://satisfactory.wiki.gg
// imageOutputPath - path where images will be created
// itemNames - list of unique names which corresponds to wiki item names (they will be used to locate image url)
func NewDownloader(imageOutputPath string, itemNames []string) Downloader {
	return Downloader{
		OutputPath: validatePath(imageOutputPath),
		ItemNames:  itemNames,
	}
}

func (d *Downloader) DownloadAll() {
	for _, name := range d.ItemNames {
		i := NewImage(name, d.OutputPath)
		err := i.Download()
		if err != nil {
			log.Println(err)
		}
	}
}

func validatePath(path string) string {
	if len(path) < 1 {
		panic("invalid output path: path can't be empty string")
	}

	return fixPathSlash(path)
}

func fixPathSlash(path string) string {
	if path[len(path)-1:] != "/" {
		return path + "/"
	}

	return path
}
