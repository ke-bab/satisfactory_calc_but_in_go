import {useEffect, useState} from "react";
import {RecipeState} from "./RecipeState";
import {observer} from "mobx-react-lite";
import {EventBus} from "../../Bus";
import {events as partEvents} from "../Part/PartState";
import './recipe-select.css'

function Recipe() {
    const [state] = useState(() => new RecipeState())

    return (
        <div id="recipe-select-container">
            <div id="recipe-selected"></div>

            {/*<select onChange={(e) => state.handleRecipeChanged(e)}*/}
            {/*        value={state.selectedRecipe ? state.selectedRecipe.name : ''}>*/}
            {/*    <option value="">not selected</option>*/}
            {/*    {state.recipes.map((recipe, index) =>*/}
            {/*        <option key={index} value={recipe.name}>{recipe.displayName}</option>*/}
            {/*    )}*/}
            {/*</select>*/}
            <div id="recipe-options">
                {state.recipes.map((recipe, index) =>
                    <div key={index}>

                        {recipe.displayName}
                        {recipe.ingredients.map((i) => {
                            return <img src={i.imgSrc40px()} alt=""/>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default observer(Recipe)
