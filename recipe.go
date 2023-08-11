package main

type Recipe struct {
	ResultName            string
	ProductionCountPerMin float32
	ProducedIn            string
	Ingredients           []*Ingredient
	Multiplier            float32
}

func (r *Recipe) ChangeCoefficient(coefficient float32) {
	r.Multiplier = coefficient
	r.ProductionCountPerMin *= r.Multiplier
	for _, i := range r.Ingredients {
		i.ChangeCoefficient(coefficient)
	}
}
