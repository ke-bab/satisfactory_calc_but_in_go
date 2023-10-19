package raw

import (
	"encoding/json"
	"factory-calc/back/game_data/raw/classes"
)

// NativeClass is a struct that holds object data in Docs.js object list
type NativeClass struct {
	NativeClass string            `json:"NativeClass"`
	ClassesRaw  []json.RawMessage `json:"Classes"`
	Classes     []classes.Class   `json:"-"`
}
