package game_data

import "factory-calc/back/game_data/raw/unmarshal"

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
