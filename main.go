package main

import (
	"encoding/json"
	rd "factory-calc/recipe_data"
	"net/http"
	"os"
)

func main() {
	recipes, err := rd.ExtractData("recipes.json")
	handleErr(err)
	//found := findByProduct(recipes, "SpaceElevatorPart_3")
	//for _, r := range found {
	//	minMulti := 60.0 / float32(r.ManufactoringDuration)
	//	fmt.Printf("found %q recipe(%s): \n", r.Name, r.DisplayName)
	//	for _, i := range r.Ingredients {
	//		println(fmt.Sprintf("- x%d %q, %.2f/min", i.Amount, i.Name, float32(i.Amount)*minMulti))
	//	}
	//}
	var namesList []SelectNames
	for _, r := range recipes {
		namesList = append(namesList, SelectNames{
			r.Name,
			r.DisplayName,
		})
	}
	namesJson, err := json.Marshal(namesList)
	handleErr(err)

	mainHtml, err := os.ReadFile("./front/index.html")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write(mainHtml)
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
