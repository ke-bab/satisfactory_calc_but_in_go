package recipes

import "factory-calc/resources"

type Receipt interface {
	GetResource() resources.Resource
	GetResourceRequirements() []Receipt
}
