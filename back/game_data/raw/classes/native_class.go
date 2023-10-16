package classes

import "encoding/json"

type NativeClass struct {
	NativeClass string            `json:"NativeClass"`
	ClassesRaw  []json.RawMessage `json:"Classes"`
	Classes     []Class           `json:"-"`
}
