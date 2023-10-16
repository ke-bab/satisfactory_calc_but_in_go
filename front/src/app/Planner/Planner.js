import {observer} from "mobx-react-lite";
import {useState} from "react";
import {PlannerState} from "./PlannerState";
import {Datalist} from "../GameData/Datalist";
import HUDControls from "../HUD/HUDControls/HUDControls";
import SearchBar from "../SearchBar/SearchBar";


function Planner() {
    const [state] = useState(new PlannerState())

    return (
        <div id="planner">
            <SearchBar/>
            {/*<RecipeSelect/>*/}
            {/*<div id="left-panel">*/}
            {/*    <div id="output">*/}
            {/*        <Part/>*/}
            {/*        <Recipe/>*/}
            {/*        <Amount/>*/}
            {/*    </div>*/}
            {/*    <Details/>*/}
            {/*    <Total/>*/}
            {/*</div>*/}
            {/*<Tree/>*/}
            <Datalist/>
            <HUDControls/>
        </div>
    )
}

export default observer(Planner)