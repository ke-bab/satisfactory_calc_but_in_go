package main

func NewRecipeCopperIngot() *Recipe {
	recipe := &Recipe{
		ResultName:            "copper_ingot",
		ProducedIn:            "smelter",
		ProductionCountPerMin: 30,
		Ingredients:           []*Ingredient{},
		Multiplier:            1,
	}
	ore := NewIngredient("copper_ore", 30, recipe)
	recipe.Ingredients = append(recipe.Ingredients, ore)

	return recipe
}
