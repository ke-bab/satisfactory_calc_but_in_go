package main

import (
	"factory-calc/back/recipe_data"
	"math/rand"
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

func TestLongBitwiseHash(t *testing.T) {
	max := 300
	n := 200

	checkMap := createCheckMap(max)
	unique := make([]int, n)
	for i := 0; i < n; {
		r := rand.Intn(max)
		if !exists(checkMap, r) {
			unique[i] = r
			addToCheckMap(&checkMap, r)
			i++
		}

	}

	if len(unique) != n {
		t.Errorf("len of slice is not %d", n)
	}
	for i, v := range unique {
		count := 0
		for _, v2 := range unique {
			if v2 == v {
				count++
			}
		}
		if count > 1 {
			t.Errorf("found non unique value: %d (index %d)", v, i)
		}
	}
}

func createCheckMap(max int) []int {
	size := max / 32
	if max%32 > 0 {
		size++
	}

	return make([]int, size)
}

func exists(checkMap []int, v int) bool {
	index := findIndex(v)
	bin := 1 << (v % 32)
	return checkMap[index]&bin > 0
}

func addToCheckMap(checkMap *[]int, v int) {
	index := findIndex(v)
	bin := 1 << (v % 32)

	(*checkMap)[index] |= bin
}

func findIndex(v int) int {
	if v == 0 {
		return 0
	}
	index := v / 32

	if v%32 == 0 {
		index--
	}

	return index
}
