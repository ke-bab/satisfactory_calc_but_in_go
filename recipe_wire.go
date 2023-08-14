package main

func NewRecipeWire() *Recipe {
	recipe := NewRecipe()
	recipe.ResultName = wire
	recipe.ProducedIn = "constructor"
	recipe.ProductionCountPerMin = 30
	recipe.Ingredients = []*Ingredient{}
	copper := NewIngredient(copperIngot, 15, recipe)
	recipe.Ingredients = append(recipe.Ingredients, copper)

	return recipe
}
