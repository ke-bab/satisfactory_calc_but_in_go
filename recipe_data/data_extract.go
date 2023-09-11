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

func ParseDescription(str string) string {
	// trim outer braces
	str = trimBraces(str)
	// parse one or more pairs in braces and get slice
	return ""
}

func trimBraces(str string) string {
	return str[1 : len(str)-1]
}
