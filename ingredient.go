package main

type Ingredient struct {
	ResourceName        string
	RequiredCountPerMin float32
	ConnectedRecipe     *Recipe
	HasNoRecipe         bool
	ParentRecipe        *Recipe
}

func (i *Ingredient) Connect(recipe *Recipe) {
	i.ConnectedRecipe = recipe
	diffMultiplier := i.RequiredCountPerMin * i.ParentRecipe.Multiplier / recipe.ProductionCountPerMin
	i.ConnectedRecipe.ChangeCoefficient(diffMultiplier)
}

func (i *Ingredient) ChangeCoefficient(coefficient float32) {
	i.ParentRecipe.Multiplier = coefficient
	i.RequiredCountPerMin *= coefficient
	if i.ConnectedRecipe != nil {
		i.ConnectedRecipe.ChangeCoefficient(coefficient)
	}
}
