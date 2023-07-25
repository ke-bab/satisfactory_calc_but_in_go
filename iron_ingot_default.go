package main

type IronIngotDefaultReceipt struct {
	IronIngotResource Resource
	Requirements      []Receipt
}

func (self *IronIngotDefaultReceipt) GetResource() Resource {
	return self.IronIngotResource
}

func (self *IronIngotDefaultReceipt) GetResourceRequirements() []Receipt {
	return self.Requirements
}
