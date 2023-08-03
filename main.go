package main

import (
	"factory-calc/recipe_data"
	"flag"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	item := flag.String("rname", "", "resource name you want to calc, like: -rname=modular-engine")
	count := flag.Int("cnt", 1, "count of resources you want, like: -cnt=10")
	flag.Parse()
	if *item == "" {
		println("resource is not specified")
		os.Exit(1)
	}
	println("вы заказали " + strconv.Itoa(*count) + " " + *item)

	recipesData, err := recipe_data.ExtractData()
	handleErr(err)

	var recipes []Recipe

	for _, recipe := range recipesData.Classes {
		recipes = append(recipes, Recipe{
			Ingredients:           nil,
			Products:              nil,
			Name:                  cleanName(recipe.ClassName),
			ProducedIn:            recipe.MProducedIn,
			ManufacturingDuration: parseDuration(recipe.MManufactoringDuration),
		})
	}

	sort.Slice(recipes, func(i, j int) bool {
		return recipes[i].Name <= recipes[j].Name
	})
	idx := sort.Search(len(recipes), func(i int) bool {
		return recipes[i].Name >= "IngotIron"
	})
	if idx < len(recipes) && recipes[idx].Name == "IngotIron" {
		println("found IngotIron: " + strconv.Itoa(idx))
	} else {
		println("IngotIron not found")
	}
}

func cleanName(className string) string {
	className = strings.TrimPrefix(className, "Recipe_")

	return strings.TrimSuffix(className, "_C")
}

func parseDuration(duration string) int {
	var float, err = strconv.ParseFloat(duration, 32)
	handleErr(err)

	return int(float)
}

func handleErr(err error) {
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}
}
