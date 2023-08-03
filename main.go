package main

import (
	"encoding/json"
	"flag"
	"os"
	"strconv"
)

type RecipesData struct {
	NativeClass string       `json:"NativeClass"`
	Classes     []RecipeData `json:"Classes"`
}

type RecipeData struct {
	ClassName              string `json:"ClassName"`
	MDisplayName           string `json:"mDisplayName"`
	MIngredients           string `json:"mIngredients"`
	MProduct               string `json:"mProduct"`
	MManufactoringDuration string `json:"mManufactoringDuration"`
	MProducedIn            string `json:"mProducedIn"`
}

func main() {
	item := flag.String("rname", "", "resource name you want to calc, like: -rname=modular-engine")
	count := flag.Int("cnt", 1, "count of resources you want, like: -cnt=10")
	flag.Parse()
	if *item == "" {
		println("resource is not specified")
		os.Exit(1)
	}
	println("вы заказали " + strconv.Itoa(*count) + " " + *item)

	file, err := os.ReadFile("recipes.json")
	handleErr(err)
	var recipeData = RecipesData{}
	err = json.Unmarshal(file, &recipeData)
	handleErr(err)

	for _, class := range recipeData.Classes {
		println(class.ClassName)
	}
}

func handleErr(err error) {
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}
}
