package recipe_data

type RecipesData struct {
	NativeClass string       `json:"NativeClass"`
	Classes     []RecipeData `json:"Classes"`
}

type RecipeData struct {
	ClassName             string `json:"ClassName"`
	DisplayName           string `json:"mDisplayName"`
	Ingredients           string `json:"mIngredients"`
	Products              string `json:"mProduct"`
	ManufactoringDuration string `json:"mManufactoringDuration"`
	ProducedIn            string `json:"mProducedIn"`
}
