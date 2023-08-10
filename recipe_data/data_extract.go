package recipe_data

import (
	"encoding/json"
	"os"
)

func ExtractData(filepath string) (*RecipesData, error) {
	file, err := os.ReadFile(filepath)
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
