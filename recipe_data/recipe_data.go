package recipe_data

type RecipesData struct {
	NativeClass string       `json:"NativeClass"`
	Classes     []RecipeData `json:"Classes"`
}

// ProducerForRecipeWithNoIngredients this is how we understand that we found resource which has no ingredients (ores, oil)
const ProducerForRecipeWithNoIngredients = "Build_Converter"

type RecipeData struct {
	ClassName              string `json:"ClassName"`
	MDisplayName           string `json:"mDisplayName"`
	MIngredients           string `json:"mIngredients"`
	MProduct               string `json:"mProduct"`
	MManufactoringDuration string `json:"mManufactoringDuration"`
	MProducedIn            string `json:"mProducedIn"`
}
