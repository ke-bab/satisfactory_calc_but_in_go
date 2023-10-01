import Part from "./Output/Part/Part";
import Recipe from "./Output/Recipe/Recipe";
import Amount from "./Output/Amount/Amount";
import {Datalist} from "./GameData/Datalist";


export function App() {
    return (
        <>
            <div id="left-panel">
                <div id="root-control">
                    <Part/>
                    <Recipe/>
                    <Amount/>
                </div>
            </div>
            <Datalist/>
        </>
    )
}