package main

func NewIngredient(name string, count float32, recipe *Recipe) *Ingredient {
	return &Ingredient{
		ResourceName:        name,
		RequiredCountPerMin: count,
		ConnectedRecipe:     nil,
		HasNoRecipe:         HasRecipe(name),
		ParentRecipe:        recipe,
	}
}

func HasRecipe(name string) bool {
	if name == "copper_ore" {
		return true
	}

	return false
}
