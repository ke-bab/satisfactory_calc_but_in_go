package main

func NewRecipeWire(multiplier float32) *Recipe {
	recipe := &Recipe{
		ResultName:            "wire",
		ProducedIn:            "constructor",
		ProductionCountPerMin: 30,
		Ingredients:           []*Ingredient{},
		Multiplier:            multiplier,
	}
	copper := NewIngredient("copper_ingot", 15, recipe)
	recipe.Ingredients = append(recipe.Ingredients, copper)

	return recipe
}
