package main

import (
	"encoding/json"
	"factory-calc/back/game_data"
	rd "factory-calc/back/recipe_data"
	"net/http"
	"os"
)

func main() {
	recipes, err := rd.ExtractData("./game_data/update7/recipes.json")
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

func containsName(str string, list []SelectNames) bool {
	for _, name := range list {
		if name.Name == str {
			return true
		}
	}

	return false
}

func webServer(recipes []rd.Recipe) {
	var resourceNames []SelectNames

	ex, err := game_data.NewExtractor("./game_data/update7/Docs.json")
	if err != nil {
		handleErr(err)
	}
	items := ex.GetItems()
	for _, item := range items {
		resourceNames = append(resourceNames, SelectNames{
			Name:        item.ClassName,
			DisplayName: item.DisplayName,
		})

	}

	resources, err := json.Marshal(resourceNames)
	handleErr(err)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		mainHtml, _ := os.ReadFile("./front/dist/index.html")
		_, err := w.Write(mainHtml)
		if err != nil {
			w.WriteHeader(400)
			return
		}
	})
	http.HandleFunc("/resource-name-list", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		_, err = w.Write(resources)
		if err != nil {
			w.WriteHeader(400)
			return
		}
	})
	http.HandleFunc("/find-recipe-by-product", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		name := r.URL.Query().Get("product")
		var found []rd.Recipe
		for _, r := range recipes {
			if r.ContainsProduct(name) {
				found = append(found, r)
			}
		}
		if found != nil {
			jsonRecipe, err := json.Marshal(found)
			if err != nil {
				println(err.Error())
				w.WriteHeader(400)
				return
			}
			_, _ = w.Write(jsonRecipe)
		} else {
			w.WriteHeader(400)
			return
		}
	})
	fs := http.FileServer(http.Dir("./front/dist"))
	http.Handle("/static/", http.StripPrefix("/static", fs))

	err = http.ListenAndServe(":3333", nil)
	handleErr(err)
}
