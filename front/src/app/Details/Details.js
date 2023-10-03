import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {DetailsState} from "./DetailsState";
import {EventBus} from "../Bus";
import {events as nodeEvents} from "../Tree/Node/NodeState";
import {events as recipeEvents} from "../Output/Recipe/RecipeState";
import {events as partEvents} from "../Output/Part/PartState";
import './details.css'

function Details() {
    const [state] = useState(() => new DetailsState())

    if (state.node) {
        return (
            <div id="details">
                <div>output: {state.node.mainProduct.name} - {state.node.amountPerMinX + "/m"} ({state.node.amountPerMin})</div>
                <div>ingredients:</div>
                {
                    state.node.ingredients.map((ingredient, index) => {
                        return <div key={index}>
                            <span>{ingredient.part.name} - {ingredient.amountPerMinX + "/m"} ({ingredient.amountPerMin})</span>
                            <span>
                            <select
                                onChange={(e) => ingredient.setSelectedRecipeByName(e.target.value)}
                                value={ingredient.selectedRecipe ? ingredient.selectedRecipe.name : ''}
                            >
                                <option value="">not selected</option>
                                {ingredient.recipeOptions.map((recipe, index) => {
                                    return <option value={recipe.name} key={index}>{recipe.displayName}</option>
                                })}
                            </select>
                        </span>
                        </div>
                    })
                }
            </div>
        )
    } else {
        return (<div id="details"></div>)
    }
}

export default observer(Details)