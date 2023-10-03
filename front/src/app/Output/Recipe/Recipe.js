import {useEffect, useState} from "react";
import {RecipeState} from "./RecipeState";
import {observer} from "mobx-react-lite";
import {EventBus} from "../../Bus";
import {events as partEvents} from "../Part/PartState";

export function Recipe() {
    const [state] = useState(() => new RecipeState())


    return (
        <select onChange={(e) => state.handleRecipeChanged(e)} value={state.selectedRecipe ? state.selectedRecipe.name : '' }>
            <option value="">not selected</option>
            {state.recipes.map((recipe, index) =>
                <option key={index} value={recipe.name}>{recipe.displayName}</option>
            )}
        </select>
    )
}

export default observer(Recipe)
