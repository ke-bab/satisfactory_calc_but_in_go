import Part from "./Output/Part/Part";
import Recipe from "./Output/Recipe/Recipe";
import Amount from "./Output/Amount/Amount";
import {Datalist} from "./GameData/Datalist";
import Tree from './Tree/Tree'
import Details from "./Details/Details";
import Total from "./Total/Total";

export function App() {
    return (
        <>
            <div id="left-panel">
                <div id="output">
                    <Part/>
                    <Recipe/>
                    <Amount/>
                </div>
                <Details/>
                <Total/>
            </div>
            <Tree/>
            <Datalist/>
        </>
    )
}