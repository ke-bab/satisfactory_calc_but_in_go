package resources

type Resource interface {
	GetDeps() []Resource
	GetName() string
}
