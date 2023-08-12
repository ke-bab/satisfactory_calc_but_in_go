package main

func NewIngredient(name string, count float32, recipe *Recipe) *Ingredient {
	return &Ingredient{
		ResourceName:        name,
		RequiredCountPerMin: count,
		ConnectedRecipe:     nil,
		IsPrimitive:         IsPrimitive(name),
		ParentRecipe:        recipe,
	}
}

func IsPrimitive(name string) bool {
	for _, iName := range *GetPrimitiveIngredientsList() {
		if name == iName {
			return true
		}
	}

	return false
}
