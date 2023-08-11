package main

import (
	"fmt"
	"os"
)

func main() {
	wireRecipe := NewRecipeWire()
	wireRecipe.Ingredients[0].Connect(NewRecipeCopperIngot())
	recursiveWalk(wireRecipe)

}

func recursiveWalk(recipe *Recipe) {
	for _, i := range recipe.Ingredients {
		if i.HasNoRecipe {
			fmt.Printf("%f\n", i.RequiredCountPerMin)
			fmt.Printf("%s\n", i.ResourceName)
		} else {
			recursiveWalk(i.ConnectedRecipe)
		}
	}
}

//func cleanName(className string) string {
//	className = strings.TrimPrefix(className, "Recipe_")
//
//	return strings.TrimSuffix(className, "_C")
//}
//
//func parseDuration(duration string) int {
//	var float, err = strconv.ParseFloat(duration, 32)
//	handleErr(err)
//
//	return int(float)
//}

func handleErr(err error) {
	if err != nil {
		println(err.Error())
		os.Exit(1)
	}
}
