package unmarshal

import (
	"encoding/json"
	"factory-calc/back/game_data/raw/classes"
	"os"
	"strings"
)

const NCItemDesc = "Class'/Script/FactoryGame.FGItemDescriptor'"

type RawData struct {
	Path          string
	NativeClasses []classes.NativeClass
}

func NewRawData(path string) RawData {
	return RawData{Path: path}
}

func (r *RawData) Extract() error {
	file, err := os.ReadFile(r.Path)
	if err != nil {
		return err
	}

	err = json.Unmarshal(file, &r.NativeClasses)
	if err != nil {
		return err
	}

	for i := 0; i < len(r.NativeClasses); i++ {
		err := r.extractClass(&r.NativeClasses[i])
		if err != nil {
			return err
		}
	}

	return nil
}

// private

func (r *RawData) extractClass(n *classes.NativeClass) error {
	if strings.Contains(n.NativeClass, NCItemDesc) {
		for _, rawClass := range n.ClassesRaw {
			var d classes.ItemDescriptor
			err := json.Unmarshal(rawClass, &d)
			if err != nil {
				return err
			}
			n.Classes = append(n.Classes, d)
		}
	}

	return nil
}
