package main

import (
	"fmt"
	"os"
)

func main() {
	wireRecipe := NewRecipeWire()
	wireRecipe.Ingredients[0].Connect(NewRecipeCopperIngot())
	fmt.Printf("%f\n", wireRecipe.Ingredients[0].ConnectedRecipe.ProductionCountPerMin)
	fmt.Printf("%s\n", wireRecipe.Ingredients[0].ConnectedRecipe.ResultName)

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
