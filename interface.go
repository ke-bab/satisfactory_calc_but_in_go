package main

type Receipt interface {
	GetResource() Resource
	GetResourceRequirements() []Receipt
}

type Resource interface {
	GetName() string
	GetReceipt() Receipt
}

type Requirement interface {
	GetResource() Resource
	GetCount() int
}
