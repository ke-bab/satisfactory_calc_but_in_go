package main

func NewRecipeWire() *Recipe {
	return &Recipe{
		ResultName:            "wire",
		ProducedIn:            "constructor",
		ProductionCountPerMin: 30,
		Ingredients: []Ingredient{
			{
				ResourceName:        "copper_ingot",
				RequiredCount:       1,
				RequiredCountPerMin: 15,
			},
		},
		Coefficient: 1,
	}
}
