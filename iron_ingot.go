package main

type IronIngot struct {
	Receipt Receipt
	Name    string
}

func NewIronIngot() *IronIngot {
	return &IronIngot{
		Receipt: &IronOre{},
		Name:    "iron ingot",
	}
}

func (ii *IronIngot) GetReceipt() Receipt {
	return ii.Receipt
}

func (ii *IronIngot) GetName() string {
	return ii.Name
}
