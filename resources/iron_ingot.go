package resources

type IronIngot struct {
	Deps []Resource
	Name string
}

func NewIronIngot() *IronIngot {
	return &IronIngot{
		Deps: []Resource{&IronOre{Deps: []Resource{}}},
		Name: "iron ingot",
	}
}

func (ii *IronIngot) GetDeps() []Resource {
	return ii.Deps
}

func (ii *IronIngot) GetName() string {
	return ii.Name
}
