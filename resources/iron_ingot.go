package resources

import "factory-calc/recipes"

type IronIngot struct {
	Receipt recipes.Receipt
	Name    string
}

func NewIronIngot() *IronIngot {
	return &IronIngot{
		Receipt: []Resource{&IronOre{Deps: []Resource{}}},
		Name:    "iron ingot",
	}
}

func (ii *IronIngot) GetReceipt() recipes.Receipt {
	return ii.Receipt
}

func (ii *IronIngot) GetName() string {
	return ii.Name
}
