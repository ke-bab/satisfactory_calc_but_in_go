import {observer} from "mobx-react-lite";
import {useState} from "react";
import {RecipeSelectState} from "./RecipeSelectState";
import './recipe-select.css'

function RecipeSelect() {
    const [state] = useState(new RecipeSelectState())

    if (state.show) {
        return (
            <div id="recipe-select">

            </div>
        )
    } else {
        return null
    }

}

export default observer(RecipeSelect)