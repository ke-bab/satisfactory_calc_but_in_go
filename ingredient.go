package main

type Ingredient struct {
	ResourceName        string
	RequiredCount       float32
	RequiredCountPerMin float32
	ConnectedRecipe     *Recipe
}

func (i *Ingredient) Connect(recipe *Recipe) {
	i.ConnectedRecipe = recipe
	productionPerMinCoefficient := i.RequiredCountPerMin / recipe.ProductionCountPerMin
	i.ConnectedRecipe.ChangeCoefficient(productionPerMinCoefficient)
}
