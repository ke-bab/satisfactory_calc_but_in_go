package main

func NewIngredient(name string, count float32) *Ingredient {
	return &Ingredient{
		ResourceName:        name,
		RequiredCountPerMin: count,
		Coefficient:         1,
		ConnectedRecipe:     nil,
		HasNoRecipe:         HasRecipe(name),
	}
}

func HasRecipe(name string) bool {
	if name == "copper_ore" {
		return false
	}

	return true
}
