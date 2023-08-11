package main

func NewRecipeCopperIngot() *Recipe {
	return &Recipe{
		ResultName:            "copper_ingot",
		ProducedIn:            "smelter",
		ProductionCountPerMin: 30,
		Ingredients:           []Ingredient{},
	}
}
