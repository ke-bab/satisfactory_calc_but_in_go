package main

type Recipe struct {
	Ingredients           []Recipe
	Products              []Recipe
	Name                  string
	ProducedIn            string
	ManufacturingDuration int
}
