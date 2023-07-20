package requirements

import "factory-calc/resources"

type Requirement interface {
	GetResource() resources.Resource
	GetCount() int
}
