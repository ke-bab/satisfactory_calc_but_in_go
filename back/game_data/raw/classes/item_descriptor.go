package classes

type ItemDescriptor struct {
	ClassName                         string `json:"ClassName"`
	MDisplayName                      string `json:"mDisplayName"`
	MDescription                      string `json:"mDescription"`
	MAbbreviatedDisplayName           string `json:"mAbbreviatedDisplayName"`
	MStackSize                        string `json:"mStackSize"`
	MCanBeDiscarded                   string `json:"mCanBeDiscarded"`
	MRememberPickUp                   string `json:"mRememberPickUp"`
	MEnergyValue                      string `json:"mEnergyValue"`
	MRadioactiveDecay                 string `json:"mRadioactiveDecay"`
	MForm                             string `json:"mForm"`
	MSmallIcon                        string `json:"mSmallIcon"`
	MPersistentBigIcon                string `json:"mPersistentBigIcon"`
	MCrosshairMaterial                string `json:"mCrosshairMaterial"`
	MDescriptorStatBars               string `json:"mDescriptorStatBars"`
	MSubCategories                    string `json:"mSubCategories"`
	MMenuPriority                     string `json:"mMenuPriority"`
	MFluidColor                       string `json:"mFluidColor"`
	MGasColor                         string `json:"mGasColor"`
	MCompatibleItemDescriptors        string `json:"mCompatibleItemDescriptors"`
	MClassToScanFor                   string `json:"mClassToScanFor"`
	MScannableType                    string `json:"mScannableType"`
	MShouldOverrideScannerDisplayText string `json:"mShouldOverrideScannerDisplayText"`
	MScannerDisplayText               string `json:"mScannerDisplayText"`
	MScannerLightColor                string `json:"mScannerLightColor"`
	MResourceSinkPoints               string `json:"mResourceSinkPoints"`
}
