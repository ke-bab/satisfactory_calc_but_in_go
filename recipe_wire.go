package main

// NewRecipeWire todo: create base constructor for every recipe to set default values
func NewRecipeWire() *Recipe {
	recipe := &Recipe{
		ResultName:            wire,
		ProducedIn:            "constructor",
		ProductionCountPerMin: 30,
		Ingredients:           []*Ingredient{},
	}
	copper := NewIngredient(copperIngot, 15, recipe)
	recipe.Ingredients = append(recipe.Ingredients, copper)

	return recipe
}
