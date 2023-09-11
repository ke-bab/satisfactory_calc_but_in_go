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
