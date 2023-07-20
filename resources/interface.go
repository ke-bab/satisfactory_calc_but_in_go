package resources

import "factory-calc/recipes"

type Resource interface {
	GetName() string
	GetReceipt() recipes.Receipt
}
