package main

type IronOre struct {
}

func (io *IronOre) GetResources() []Resource {
	return []Resource{}
}
func (io *IronOre) GetReceipt() Receipt {
	return nil
}

func (io *IronOre) GetName() string {
	return "iron ore"
}

func (io *IronOre) GetResource() Resource {
	return io
}

func (io *IronOre) GetResourceRequirements() []Receipt {
	return []Receipt{}
}
