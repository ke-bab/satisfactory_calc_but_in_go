package main

import "sync"

var primitivesList *[]string
var oncePrimitivesList sync.Once

func GetPrimitiveIngredientsList() *[]string {
	oncePrimitivesList.Do(func() {
		primitivesList = &[]string{
			copperOre,
			ironOre,
			cateriumOre,
			oil,
			sulfur,
			limestone,
		}
	})

	return primitivesList
}
