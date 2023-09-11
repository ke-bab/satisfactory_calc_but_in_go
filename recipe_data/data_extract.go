package recipe_data

import (
	"encoding/json"
	"os"
	"strings"
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

type ResourceDescription struct {
	Amount int
	Name   string
}

func parseDescription(str string) []ResourceDescription {
	// trim outer braces
	str = trimBraces(str)
	// split string
	// parse strings and push to slice
	// return slice

	return []ResourceDescription{}
}

func trimBraces(str string) string {
	return str[1 : len(str)-1]
}

func splitResourceStrings(str string) []string {
	pos := 0
	var split []string
	for {
		if len(str) <= pos {
			break
		}
		ok, l, r := findBracePair(str[pos:])
		if ok {
			split = append(split, str[l+pos:r+pos+1])
			pos = r + pos + 1
		} else {
			break
		}
	}

	return split
}

func findBracePair(str string) (bool, int, int) {
	l := strings.Index(str, "(")
	r := strings.Index(str, ")")
	if l == -1 || r == -1 {
		return false, l, r
	}
	if l > r {
		// left brace is after right, not valid
		return false, l, r
	}

	return true, l, r
}
