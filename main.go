package main

import (
	"fmt"
	"os"
)

func main() {
	wireRecipe := NewRecipeWire()
	wireRecipe.SetMulti(1)
	wireRecipe.findIngredientByName(copperIngot).Connect(NewRecipeCopperIngot())
	printPrimitiveIngredients(wireRecipe)

	catWireRecipe := NewRecipeCateriumWire()
	catWireRecipe.SetMulti(1)
	catWireRecipe.findIngredientByName(copperIngot).Connect(NewRecipeCopperIngot())
	catWireRecipe.findIngredientByName(cateriumIngot).Connect(NewRecipeCateriumIngot())
	printPrimitiveIngredients(catWireRecipe)
}

func printPrimitiveIngredients(recipe *Recipe) {
	if recipe != nil && recipe.Ingredients != nil {
		for _, i := range recipe.Ingredients {
			if i.IsPrimitive {
				fmt.Printf("%f\n", i.GetRequiredCountWithMulti())
				fmt.Printf("%s\n", i.ResourceName)
			} else {
				printPrimitiveIngredients(i.ConnectedRecipe)
			}
		}
	} else {
		panic("you printed recipe with no connected ingredient recipe")
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
