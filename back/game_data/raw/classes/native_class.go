package classes

import "encoding/json"

// NativeClass is a struct that holds object data in Docs.js object list
type NativeClass struct {
	NativeClass string            `json:"NativeClass"`
	ClassesRaw  []json.RawMessage `json:"Classes"`
	Classes     []Class           `json:"-"`
}
