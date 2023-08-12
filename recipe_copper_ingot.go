package main

func NewRecipeCopperIngot() *Recipe {
	recipe := &Recipe{
		ResultName:            copperIngot,
		ProducedIn:            "smelter",
		ProductionCountPerMin: 30,
		Ingredients:           []*Ingredient{},
		Multiplier:            1,
	}
	ore := NewIngredient(copperOre, 30, recipe)
	recipe.Ingredients = append(recipe.Ingredients, ore)

	return recipe
}
