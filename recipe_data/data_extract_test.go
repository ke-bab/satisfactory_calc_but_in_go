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
	data := "\"(ItemClass=BlueprintGeneratedClass'\\\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\\\"',Amount=15),(ItemClass=BlueprintGeneratedClass'\\\"/Game/FactoryGame/Resource/Parts/CircuitBoard/Desc_CircuitBoard.Desc_CircuitBoard_C\\\"',Amount=10),(ItemClass=BlueprintGeneratedClass'\\\"/Game/FactoryGame/Resource/Parts/ModularFrameHeavy/Desc_ModularFrameHeavy.Desc_ModularFrameHeavy_C\\\"',Amount=2),(ItemClass=BlueprintGeneratedClass'\\\"/Game/FactoryGame/Resource/Parts/Computer/Desc_Computer.Desc_Computer_C\\\"',Amount=2)\""
	split := splitResourceStrings(data)
	want1 := "(ItemClass=BlueprintGeneratedClass'\\\"/Game/FactoryGame/Resource/Parts/SpaceElevatorParts/Desc_SpaceElevatorPart_3.Desc_SpaceElevatorPart_3_C\\\"',Amount=15)"
	want2 := "(ItemClass=BlueprintGeneratedClass'\\\"/Game/FactoryGame/Resource/Parts/CircuitBoard/Desc_CircuitBoard.Desc_CircuitBoard_C\\\"',Amount=10)"
	if split[0] != want1 {
		t.Errorf("got %q as first resource string, want: %q", split[0], want1)
	}
	if split[1] != want2 {
		t.Errorf("got %q as second resource string, want: %q", split[1], want2)
	}
}
