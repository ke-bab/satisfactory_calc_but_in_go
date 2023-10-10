package image_download

import (
	"errors"
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"io"
	"net/http"
	"os"
	"strings"
)

type Image struct {
	name            string
	nameUnderscored string
	outputPath      string
}

func NewImage(name string, outputPath string) Image {
	return Image{name: name, outputPath: outputPath, nameUnderscored: getUnderscored(name)}
}

func (i *Image) Download() error {
	_256px_imgSrc, err := i.find256pxImageUrl()
	if err != nil {
		return err
	}
	for _, variant := range getVariants() {
		url := variant.getSrcLink(_256px_imgSrc)
		err = i.download(url, variant)
		if err != nil {
			return err
		}
	}

	return nil
}

func (i *Image) find256pxImageUrl() (string, error) {
	res, err := http.Get(baseWikiUrl + i.nameUnderscored)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		return "", errors.New(fmt.Sprintf("status code error: %d %s", res.StatusCode, res.Status))
	}

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return "", err
	}

	found, ok := "", false
	selector := "a[title=\"" + i.name + ".png\"] > img"
	doc.Find(selector).Each(func(_ int, s *goquery.Selection) {
		found, ok = s.Attr("src")
	})
	if ok {
		return found, nil
	} else {
		return "", errors.New("can't find 256px url for selector: " + selector)
	}
}

func (i *Image) download(url string, v Variant) error {
	itemDir := i.outputPath + i.nameUnderscored + "/"
	println(itemDir)
	err := os.MkdirAll(itemDir, os.ModePerm)
	if err != nil {
		return err
	}

	var fileName string
	if v.IsThumb {
		fileName = v.ThumbVariant + "-" + i.nameUnderscored + ".png"
	} else {
		fileName = "256px-" + i.nameUnderscored + ".png"
	}

	filePath := itemDir + fileName
	_, err = os.Stat(filePath)
	if err == nil {
		return errors.New(filePath + ": already exists, skipping")
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	response, err := http.Get(baseUrl + url)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		return err
	}
	fmt.Println("Success!")

	return nil
}

func getUnderscored(name string) string {
	return strings.Replace(name, " ", "_", -1)
}
