package recipe_data

import (
	"encoding/json"
	"os"
)

func ExtractData() (*RecipesData, error) {
	file, err := os.ReadFile("recipes.json")
	if err != nil {
		return nil, err
	}
	var recipeData = RecipesData{}
	err = json.Unmarshal(file, &recipeData)
	if err != nil {
		return nil, err
	}
	return &recipeData, nil
}
