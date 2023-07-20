package resources

type IronOre struct {
	Deps []Resource
}

func (io *IronOre) GetDeps() []Resource {
	return []Resource{}
}

func (io *IronOre) GetName() string {
	return "iron ore"
}
