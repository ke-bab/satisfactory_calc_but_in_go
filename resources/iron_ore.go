package resources

type IronOre struct {
	Deps []Resource
}

func (io *IronOre) GetResources() []Resource {
	return []Resource{}
}

func (io *IronOre) GetName() string {
	return "iron ore"
}
