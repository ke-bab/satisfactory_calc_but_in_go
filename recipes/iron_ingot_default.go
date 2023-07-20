package recipes

import "factory-calc/resources"

type IronIngotDefaultReceipt struct {
	IronIngotResource resources.Resource
	Requirements      []Receipt
}

func (self *IronIngotDefaultReceipt) GetResource() resources.Resource {
	return self.IronIngotResource
}

func (self *IronIngotDefaultReceipt) GetResourceRequirements() []Receipt {
	return self.Requirements
}
