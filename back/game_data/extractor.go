package game_data

import (
	"factory-calc/back/game_data/raw/classes"
	"factory-calc/back/game_data/raw/unmarshal"
	"strings"
)

func NewExtractor(path string) Extractor {
	return Extractor{RawData: unmarshal.NewRawData(path)}
}

type Extractor struct {
	RawData unmarshal.RawData
}

func (e *Extractor) ExtractRaw() error {
	err := e.RawData.Extract()
	if err != nil {
		return err
	}

	return nil
}

func (e *Extractor) GetItemDescriptors() []classes.ItemDescriptor {
	var items []classes.ItemDescriptor
	for _, nClass := range e.RawData.NativeClasses {
		if strings.Contains(nClass.NativeClass, unmarshal.NCItemDesc) {
			for _, class := range nClass.Classes {
				if v, ok := class.(classes.ItemDescriptor); ok {
					items = append(items, v)
				}
			}
		}
	}

	return items
}
