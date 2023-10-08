package main

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	res, err := http.Get("https://satisfactory.wiki.gg/wiki/Uranium_Waste")
	if err != nil {
		log.Fatal(err)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			log.Fatal(err)
		}
	}(res.Body)
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	selector := "a[title=\"Uranium Waste\"] > img"
	fmt.Println(len(doc.Find(selector).Nodes))

	foundImages := make(map[string]string)
	doc.Find(selector).Each(func(i int, s *goquery.Selection) {
		src, _ := s.Attr("src")
		_, ok := foundImages[src]
		if !ok {
			download(src)
			foundImages[src] = src
		}
	})

}

func download(url string) {
	err := os.MkdirAll("images/Uranium_Waste", os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}

	index := strings.LastIndex(url, "/")
	fileName := url[index:]

	file, err := os.Create("./images/Uranium_Waste/" + fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	response, e := http.Get("https://satisfactory.wiki.gg" + url)
	if e != nil {
		log.Fatal(e)
	}
	defer response.Body.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Success!")
}
