package interfaces

type Receipt interface {
	GetResource() Resource
	GetResourceRequirements() []Requirement
}

type Resource interface {
	GetName() string
	GetReceipt() Receipt
}

type Requirement interface {
	Resource
	GetCount() int
}
