package main

import (
	rd "factory-calc/recipe_data"
	"fmt"
	"os"
)

func main() {
	recipes, err := rd.ExtractData("recipes.json")
	handleErr(err)
	found := findByProduct(recipes, "SpaceElevatorPart_3")
	for _, r := range found {
		minMulti := 60.0 / float32(r.ManufactoringDuration)
		fmt.Printf("found %q recipe(%s): \n", r.Name, r.DisplayName)
		for _, i := range r.Ingredients {
			println(fmt.Sprintf("- x%d %q, %.2f/min", i.Amount, i.Name, float32(i.Amount)*minMulti))
		}
	}
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
