package main

func NewRecipeCateriumWire() *Recipe {
	recipe := NewRecipe()
	recipe.ResultName = wire
	recipe.ProducedIn = "assembler"
	recipe.ProductionCountPerMin = 90
	recipe.Ingredients = []*Ingredient{}
	copper := NewIngredient(copperIngot, 12, recipe)
	recipe.Ingredients = append(recipe.Ingredients, copper)
	cateriumIngot := NewIngredient(cateriumIngot, 3, recipe)
	recipe.Ingredients = append(recipe.Ingredients, cateriumIngot)

	return recipe
}
