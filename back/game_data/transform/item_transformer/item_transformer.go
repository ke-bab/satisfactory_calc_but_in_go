package item_transformer

import (
	"factory-calc/back/game_data/processed/classes"
	raw "factory-calc/back/game_data/raw/classes"
)

func TransformItem(rawItem raw.ItemDescriptor) (classes.ItemDescriptor, error) {
	var transformed classes.ItemDescriptor

	transformed.ClassName = stripClassName(rawItem.ClassName)
	transformed.DisplayName = rawItem.MDisplayName

	return transformed, nil
}

func stripClassName(name string) string {
	return name[5 : len(name)-2]
}
