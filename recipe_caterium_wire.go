package main

func NewRecipeCateriumWire() *Recipe {
	recipe := &Recipe{
		ResultName:            wire,
		ProducedIn:            "assembler",
		ProductionCountPerMin: 90,
		Ingredients:           []*Ingredient{},
	}
	copper := NewIngredient(copperIngot, 12, recipe)
	cateriumIngot := NewIngredient(cateriumIngot, 3, recipe)
	recipe.Ingredients = append(recipe.Ingredients, copper)
	recipe.Ingredients = append(recipe.Ingredients, cateriumIngot)

	return recipe
}
