package main

import (
	"encoding/json"
	rd "factory-calc/recipe_data"
	"net/http"
	"os"
	"strings"
)

func main() {
	recipes, err := rd.ExtractData("recipes.json")
	handleErr(err)
	webServer(recipes)
}

type SelectNames struct {
	Name        string `json:"name"`
	DisplayName string `json:"displayName"`
}

func handleErr(err error) {
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}
}

func findByProduct(recipes []rd.Recipe, str string) []rd.Recipe {
	var found []rd.Recipe
	for _, r := range recipes {
		if r.ContainsProduct(str) {
			found = append(found, r)
		}
	}

	return found
}

func webServer(recipes []rd.Recipe) {
	var namesList []SelectNames
	for _, r := range recipes {
		if !strings.Contains(r.Name, "Alternate") {
			namesList = append(namesList, SelectNames{
				r.Name,
				r.DisplayName,
			})
		}
	}
	namesJson, err := json.Marshal(namesList)
	handleErr(err)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		mainHtml, _ := os.ReadFile("./front/index.html")
		_, err := w.Write(mainHtml)
		if err != nil {
			w.WriteHeader(422)
			return
		}
	})
	http.HandleFunc("/resource-name-list", func(w http.ResponseWriter, r *http.Request) {
		_, err = w.Write(namesJson)
		if err != nil {
			w.WriteHeader(422)
			return
		}
	})
	fs := http.FileServer(http.Dir("./front"))
	http.Handle("/static/", http.StripPrefix("/static", fs))

	err = http.ListenAndServe(":3333", nil)
	handleErr(err)
}
