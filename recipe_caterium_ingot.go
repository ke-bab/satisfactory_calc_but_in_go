package main

func NewRecipeCateriumIngot() *Recipe {
	recipe := &Recipe{
		ResultName:            cateriumIngot,
		ProducedIn:            "smelter",
		ProductionCountPerMin: 15,
		Ingredients:           []*Ingredient{},
	}
	copper := NewIngredient(cateriumOre, 45, recipe)
	recipe.Ingredients = append(recipe.Ingredients, copper)

	return recipe
}
