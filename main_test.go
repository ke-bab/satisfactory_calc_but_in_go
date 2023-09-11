package main

import (
	"factory-calc/recipe_data"
	"testing"
)

func TestFindLike(t *testing.T) {
	recipes := []recipe_data.Recipe{
		{
			Products: []recipe_data.ResourceDescription{
				{Name: "IronRod"},
			},
		},
	}
	found := findByProduct(recipes, "IronRod")
	notFound := findByProduct(recipes, "SteelIngot")
	if len(found) != 1 {
		t.Errorf("len of found slice is not 1")
	}
	if len(notFound) != 0 {
		t.Errorf("len of notFound slice is not 0")
	}
}
