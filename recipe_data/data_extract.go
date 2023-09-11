package recipe_data

import (
	"encoding/json"
	"os"
	"strconv"
	"strings"
)

func ExtractData(filepath string) ([]Recipe, error) {
	file, err := os.ReadFile(filepath)
	if err != nil {
		return nil, err
	}
	var recipeData = RecipesData{}
	var recipes []Recipe
	err = json.Unmarshal(file, &recipeData)
	if err != nil {
		return nil, err
	}
	for _, recipe := range recipeData.Classes {
		ingredients, err := parseDescription(recipe.Ingredients)
		if err != nil {
			return nil, err
		}
		products, err := parseDescription(recipe.Products)
		if err != nil {
			return nil, err
		}
		durationF32, err := strconv.ParseFloat(recipe.ManufactoringDuration, 32)
		duration := int(durationF32)
		if err != nil {
			return nil, err
		}
		recipes = append(recipes, Recipe{
			Name:                  recipe.ClassName,
			DisplayName:           recipe.DisplayName,
			Ingredients:           ingredients,
			Products:              products,
			ManufactoringDuration: duration,
			ProducedIn:            recipe.ProducedIn,
		})
	}

	return recipes, nil
}

type Recipe struct {
	Name                  string
	DisplayName           string
	Ingredients           []ResourceDescription
	Products              []ResourceDescription
	ManufactoringDuration int
	ProducedIn            string
}

func (r Recipe) ContainsProduct(str string) bool {
	for _, p := range r.Products {
		if strings.Contains(p.Name, str) {
			return true
		}
	}

	return false
}

type ResourceDescription struct {
	Amount int
	Name   string
}

func parseDescription(str string) ([]ResourceDescription, error) {
	str = trimBraces(str)
	split := splitResourceStrings(str)
	var splitParsed []ResourceDescription
	for _, resStr := range split {
		resDesc, err := parseResourceString(resStr)
		if err != nil {
			return []ResourceDescription{}, err
		}
		splitParsed = append(splitParsed, resDesc)
	}

	return splitParsed, nil
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
			l, r = l+pos, r+pos // because we want absolute position, not relative
			split = append(split, str[l:r+1])
			pos = r + 1
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

func parseResourceString(str string) (ResourceDescription, error) {
	str = trimBraces(str) // trim outer braces again
	split := strings.Split(str, ",")
	itemValue := cutItemNameFromClassDefinition(getValue(split[0]))
	amountValueInt, err := strconv.Atoi(getValue(split[1]))
	if err != nil {
		return ResourceDescription{}, err
	}

	return ResourceDescription{
		Amount: amountValueInt,
		Name:   itemValue,
	}, nil
}

func getValue(str string) string {
	return strings.Split(str, "=")[1]
}

func cutItemNameFromClassDefinition(str string) string {
	className := strings.Split(str, ".")[1]
	bpIndex := strings.Index(className, "BP_")
	descIndex := strings.Index(className, "Desc_")
	if bpIndex != -1 {
		return className[3 : len(className)-4]
	}
	if descIndex != -1 {
		return className[5 : len(className)-4]
	}

	return className[:len(className)-4]
}
