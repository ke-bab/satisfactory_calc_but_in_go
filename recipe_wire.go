package main

func NewRecipeWire() *Recipe {
	return &Recipe{
		ResultName:            "wire",
		ProducedIn:            "constructor",
		ProductionCountPerMin: 30,
		Ingredients: []*Ingredient{
			NewIngredient("copper_ingot", 15),
		},
		Coefficient: 1,
	}
}
