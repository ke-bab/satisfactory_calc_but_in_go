package image_download

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
		return convertToThumb(imageSrcExample)
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

func convertToThumb(imgSrc string) string {
	//"images/thumb/7/7d/Uranium_Waste.png/40px-Uranium_Waste.png"
	return imgSrc
}
