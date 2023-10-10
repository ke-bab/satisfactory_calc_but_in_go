package image_download

import "strings"

const (
	_20px = "20px"
	_40px = "40px"
	none  = ""
)

type Variant struct {
	IsThumb      bool
	ThumbVariant string
}

func NewVariant(isThumb bool, thumbVar string) Variant {
	return Variant{IsThumb: isThumb, ThumbVariant: thumbVar}
}

func (v *Variant) getSrcLink(imageSrcExample string) string {
	if v.IsThumb {
		return v.convertToThumb(imageSrcExample)
	} else {
		return imageSrcExample
	}
}

func getVariants() []Variant {
	return []Variant{
		NewVariant(false, none),
		NewVariant(true, _20px),
		NewVariant(true, _40px),
	}
}

func (v *Variant) convertToThumb(imgSrc string) string {
	converted := imgSrc[7:]
	lastSlash := strings.LastIndex(imgSrc, "/")
	fileName := imgSrc[lastSlash+1:]
	converted = "/images/thumb" + converted
	converted = converted + "/" + v.ThumbVariant + "-" + fileName

	return converted
}
