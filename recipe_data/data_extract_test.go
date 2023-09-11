package recipe_data

import "testing"

func TestTrimBraces(t *testing.T) {
	str := "((ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\"',Amount=15),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/CircuitBoard/Desc_CircuitBoard.Desc_CircuitBoard_C\"',Amount=10),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/ModularFrameHeavy/Desc_ModularFrameHeavy.Desc_ModularFrameHeavy_C\"',Amount=2),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Computer/Desc_Computer.Desc_Computer_C\"',Amount=2))"
	got := trimBraces(str)
	want := "(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\"',Amount=15),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/CircuitBoard/Desc_CircuitBoard.Desc_CircuitBoard_C\"',Amount=10),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/ModularFrameHeavy/Desc_ModularFrameHeavy.Desc_ModularFrameHeavy_C\"',Amount=2),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Computer/Desc_Computer.Desc_Computer_C\"',Amount=2)"
	if got != want {
		t.Errorf("got %q, wanted %q", got, want)
	}
}

func TestFindBracePair(t *testing.T) {
	data := "(123),(123)"
	ok, l, r := findBracePair(data)
	if ok == false {
		t.Errorf("braces not found in %q", data)
	}
	if l != 0 {
		t.Errorf("l is not 0 index")
	}
	if r != 4 {
		t.Errorf("r is not 4 index")
	}
}

func TestSplitResourceStrings(t *testing.T) {
	data := "\"(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\"',Amount=15),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/CircuitBoard/Desc_CircuitBoard.Desc_CircuitBoard_C\"',Amount=10),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/ModularFrameHeavy/Desc_ModularFrameHeavy.Desc_ModularFrameHeavy_C\"',Amount=2),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Computer/Desc_Computer.Desc_Computer_C\"',Amount=2)\""
	split := splitResourceStrings(data)
	want1 := "(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\"',Amount=15)"
	want2 := "(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/CircuitBoard/Desc_CircuitBoard.Desc_CircuitBoard_C\"',Amount=10)"
	if split[0] != want1 {
		t.Errorf("got %q as first resource string, want: %q", split[0], want1)
	}
	if split[1] != want2 {
		t.Errorf("got %q as second resource string, want: %q", split[1], want2)
	}
}

func TestCutItemNameFromClassDefinition(t *testing.T) {
	data := "BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\"'"
	got := cutItemNameFromClassDefinition(data)
	want := "SpaceElevatorPart_3"
	if got != want {
		t.Errorf("got %q, want: %q", got, want)
	}
}

func TestCutPatternFromClassname(t *testing.T) {
	data := "Recipe_Alternate_HighSpeedWiring_C"
	got := cutPatternFromClassname(data)
	want := "Alternate_HighSpeedWiring"
	if got != want {
		t.Errorf("got %q, want: %q", got, want)
	}
}

func TestGetValue(t *testing.T) {
	data := "ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\"'"
	got := getValue(data)
	want := "BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\"'"
	if got != want {
		t.Errorf("got %q, want: %q", got, want)
	}
}

func TestParseResourceString(t *testing.T) {
	data := "(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Buildable/Vehicle/Truck/Desc_Truck.Desc_Truck_C\"',Amount=1)"
	got, err := parseResourceString(data)
	if err != nil {
		t.Errorf("got error: %s", err)
	}
	want := ResourceDescription{
		Amount: 1,
		Name:   "Truck",
	}
	if got.Amount != want.Amount {
		t.Errorf("got amount %d, want amount: %d", got.Amount, want.Amount)
	}
	if got.Name != want.Name {
		t.Errorf("got name %q, want name: %q", got.Name, want.Name)
	}
}

func TestExtractData(t *testing.T) {
	_, err := ExtractData("../recipes.json")
	if err != nil {
		t.Errorf("got error: %s", err)
	}
}

func TestContainsProduct(t *testing.T) {
	recipe := Recipe{
		Products: []ResourceDescription{
			{
				Amount: 1,
				Name:   "Wall_Concrete_8x1",
			}, {
				Amount: 1,
				Name:   "NobeliskNuke",
			},
		},
	}
	positive := recipe.ContainsProduct("NobeliskNuke")
	negative := recipe.ContainsProduct("IronRod")

	if !positive {
		t.Errorf("NobeliskNuke returns false")
	}
	if negative {
		t.Errorf("IronRod returns true")
	}
}
