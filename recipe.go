package main

type Recipe struct {
	ResultName            string
	ProductionCountPerMin float32
	ProducedIn            string
	Ingredients           []Ingredient
	Coefficient           float32
}

func (r *Recipe) ChangeCoefficient(coefficient float32) {
	r.Coefficient = coefficient
	r.ProductionCountPerMin *= r.Coefficient
}
