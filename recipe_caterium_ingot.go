package main

func NewRecipeCateriumIngot() *Recipe {
	recipe := NewRecipe()
	recipe.ResultName = cateriumIngot
	recipe.ProducedIn = "smelter"
	recipe.ProductionCountPerMin = 15
	recipe.Ingredients = []*Ingredient{}
	copper := NewIngredient(cateriumOre, 45, recipe)
	recipe.Ingredients = append(recipe.Ingredients, copper)

	return recipe
}
