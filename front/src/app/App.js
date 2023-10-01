import PartSearch from "./OutputControl/PartSearch";
import {RecipeSelect} from "./OutputControl/RecipeSelect";
import {AmountInput} from "./OutputControl/AmountInput";
import {Datalist} from "./GameData/Datalist";


export function App() {
    return (
        <>
            <div id="left-panel">
                <div id="root-control">
                    <PartSearch/>
                    <RecipeSelect/>
                    <AmountInput/>
                </div>
            </div>
            <Datalist/>
        </>
    )
}