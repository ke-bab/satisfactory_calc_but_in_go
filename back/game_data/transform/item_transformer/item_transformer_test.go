package item_transformer

import "testing"

func TestStripClassName(t *testing.T) {
	str := "Desc_NuclearWaste_C"
	want := "NuclearWaste"
	got := stripClassName(str)
	if got != want {
		t.Errorf("want: %s, got: %s", want, got)
	}
}
