package game_data

import (
	"factory-calc/back/game_data/processed"
	transformed "factory-calc/back/game_data/processed/classes"
	"factory-calc/back/game_data/raw/unmarshal"
	"factory-calc/back/game_data/transform"
	"strings"
)

func NewExtractor(path string) (Extractor, error) {
	raw, err := unmarshal.NewRawData(path)
	if err != nil {
		return Extractor{}, err
	}
	transformed, err := transform.TransformList(raw.NativeClasses)
	if err != nil {
		return Extractor{}, err
	}

	return Extractor{
		RawData:   raw,
		Processed: transformed,
	}, nil
}

type Extractor struct {
	RawData   unmarshal.RawData
	Processed []processed.NativeClass
}

func (e *Extractor) GetItems() []transformed.ItemDescriptor {
	var items []transformed.ItemDescriptor
	for _, nClass := range e.Processed {
		if strings.Contains(nClass.NativeClass, unmarshal.NCItemDesc) {
			for _, class := range nClass.Classes {
				if v, ok := class.(transformed.ItemDescriptor); ok {
					items = append(items, v)
				}
			}
		}
	}

	return items
}
