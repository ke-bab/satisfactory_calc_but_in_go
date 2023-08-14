package main

// NewRecipe is base constructor for all other recipes
func NewRecipe() *Recipe {
	return &Recipe{
		Multiplier: 1,
	}
}
