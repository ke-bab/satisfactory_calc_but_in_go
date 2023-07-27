package app

import (
	"factory-calc/interfaces"
)

type IronIngotDefaultReceipt struct{}

func NewIronIngotDefaultRecipe() *IronIngotDefaultReceipt {
	return &IronIngotDefaultReceipt{}
}

func (r *IronIngotDefaultReceipt) GetResource() interfaces.Resource {
	return NewIronIngot()
}

func (r *IronIngotDefaultReceipt) GetResourceRequirements() []interfaces.Requirement {
	return []interfaces.Requirement{NewIronOre()}
}
