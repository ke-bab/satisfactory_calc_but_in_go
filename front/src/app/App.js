import { useState } from 'react';

import {OutputControl} from "./OutputControl/OutputControl";
import {GameData} from "./GameData/GameData";
import {Tree} from "./Tree/Tree";
import {PartSearchReact} from "./OutputControl/PartSearch";
import {RecipeSelectReact} from "./OutputControl/RecipeSelect";
import {AmountInputReact} from "./OutputControl/AmountInput";
import {EventBus} from "./Bus";
import {Datalist} from "./GameData/Datalist";

export class App {
    tree = new Tree()
    out = new OutputControl()
    gameData = new GameData()


    run() {

    }
}

export function AppReact() {
    const [showSelect, setShowSelect] = useState(false);
    const [showAmount, setShowAmount] = useState(false);

    function handlePartChange(part) {
        if (part === '') {
            setShowSelect(false)
            setShowAmount(false)

        }
    }

    return (
        <>
            <div id="left-panel">
                <div id="root-control">
                    <PartSearchReact/>
                    <RecipeSelectReact/>
                    <AmountInputReact/>
                </div>
            </div>
            <Datalist/>
        </>
    )
}