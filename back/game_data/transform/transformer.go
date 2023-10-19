package transform

import (
	"factory-calc/back/game_data/processed"
	"factory-calc/back/game_data/raw"
	"factory-calc/back/game_data/raw/classes"
	"factory-calc/back/game_data/raw/unmarshal"
	itransformer "factory-calc/back/game_data/transform/item_transformer"
	"strings"
)

func TransformList(list []raw.NativeClass) ([]processed.NativeClass, error) {
	var result []processed.NativeClass
	for _, class := range list {
		tClass, err := transformNativeClass(class)
		if err != nil {
			return nil, err
		}
		result = append(result, tClass)
	}

	return result, nil
}

func transformNativeClass(nclass raw.NativeClass) (processed.NativeClass, error) {
	var result processed.NativeClass
	if strings.Contains(nclass.NativeClass, unmarshal.NCItemDesc) {
		for _, class := range nclass.Classes {
			itemClass, _ := class.(classes.ItemDescriptor)
			tClass, err := itransformer.TransformItem(itemClass)
			if err != nil {
				return processed.NativeClass{}, err
			}
			result.Classes = append(result.Classes, tClass)
		}
	}
	result.NativeClass = nclass.NativeClass

	return result, nil
}
