package main

type Ingredient struct {
	ResourceName        string
	RequiredCountPerMin float32
	Coefficient         float32
	ConnectedRecipe     *Recipe
	HasNoRecipe         bool
}

func (i *Ingredient) Connect(recipe *Recipe) {
	i.ConnectedRecipe = recipe
	productionPerMinCoefficient := i.RequiredCountPerMin / recipe.ProductionCountPerMin
	i.ConnectedRecipe.ChangeCoefficient(productionPerMinCoefficient)
}

func (i *Ingredient) ChangeCoefficient(coefficient float32) {
	i.Coefficient = coefficient
	i.RequiredCountPerMin *= coefficient
	if i.ConnectedRecipe != nil {
		i.ConnectedRecipe.ChangeCoefficient(coefficient)
	}
}
