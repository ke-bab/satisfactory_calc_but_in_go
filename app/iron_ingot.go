package app

import (
	"factory-calc/interfaces"
)

type IronIngot struct {
	Receipt interfaces.Receipt
	Name    string
}

func NewIronIngot() *IronIngot {
	return &IronIngot{
		Receipt: NewIronIngotDefaultRecipe(),
		Name:    "iron ingot",
	}
}

func (ii *IronIngot) GetReceipt() interfaces.Receipt {
	return ii.Receipt
}

func (ii *IronIngot) GetName() string {
	return ii.Name
}
