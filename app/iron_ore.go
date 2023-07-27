package app

import "factory-calc/interfaces"

type IronOre struct {
}

func (io *IronOre) GetCount() int {
	return 10
}

func NewIronOre() *IronOre {
	return &IronOre{}
}

func (io *IronOre) GetResources() []interfaces.Resource {
	return []interfaces.Resource{}
}
func (io *IronOre) GetReceipt() interfaces.Receipt {
	return nil
}

func (io *IronOre) GetName() string {
	return "iron ore"
}

func (io *IronOre) GetResource() interfaces.Resource {
	return io
}

func (io *IronOre) GetResourceRequirements() []interfaces.Receipt {
	return []interfaces.Receipt{}
}
