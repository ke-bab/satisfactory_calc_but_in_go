package main

type Ingredient struct {
	ResourceName        string
	RequiredCountPerMin float32
	ConnectedRecipe     *Recipe
	IsPrimitive         bool
	ParentRecipe        *Recipe
}

func (i *Ingredient) GetRequiredCountWithMulti() float32 {
	return i.RequiredCountPerMin * i.ParentRecipe.Multiplier
}

func (i *Ingredient) Connect(recipe *Recipe) {
	i.ConnectedRecipe = recipe
	diffMultiplier := i.RequiredCountPerMin * i.ParentRecipe.Multiplier / recipe.ProductionCountPerMin
	i.ConnectedRecipe.SetMulti(diffMultiplier)
}

func (i *Ingredient) SetMultiForConnectedRecipe(multiplier float32) {
	if i.ConnectedRecipe != nil {
		i.ConnectedRecipe.SetMulti(multiplier)
	}
}
