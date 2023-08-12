package main

import "fmt"

type Recipe struct {
	ResultName            string
	ProductionCountPerMin float32
	ProducedIn            string
	Ingredients           []*Ingredient
	Multiplier            float32
}

func (r *Recipe) GetResultCount() float32 {
	return r.ProductionCountPerMin * r.Multiplier
}

func (r *Recipe) SetMulti(multiplier float32) {
	r.Multiplier = multiplier
	for _, i := range r.Ingredients {
		i.SetMultiForConnectedRecipe(multiplier)
	}
}

func (r *Recipe) findIngredientByName(name string) *Ingredient {
	for _, i := range r.Ingredients {
		if i.ResourceName == name {
			return i
		}
	}
	reason := fmt.Sprintf("ingredient %s not found in recipe %s", name, r.ResultName)
	panic(reason)
}
