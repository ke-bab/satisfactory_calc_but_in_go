package image_download

import "testing"

func TestConvertToThumb(t *testing.T) {
	v := NewVariant(true, _40px)

	str := "/images/7/7d/Uranium_Waste.png"
	want := "/images/thumb/7/7d/Uranium_Waste.png/40px-Uranium_Waste.png"
	got := v.convertToThumb(str)
	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}
