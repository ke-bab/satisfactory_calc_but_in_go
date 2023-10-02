import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {DetailsState} from "./DetailsState";
import {EventBus} from "../Bus";
import {events as nodeEvents} from "../Tree/Node/NodeState";
import {events as recipeEvents} from "../Output/Recipe/RecipeState";
import {events as partEvents} from "../Output/Part/PartState";

function Details() {
    const [state] = useState(new DetailsState())

    useEffect(() => {
        EventBus.subscribe(nodeEvents.clicked, (node) => state.handleNodeClick(node))
        EventBus.subscribe(recipeEvents.recipeChanged, (node) => state.handleOutputChanged())
        EventBus.subscribe(partEvents.partChanged, (node) => state.handleOutputChanged())
    }, []);

    if (state.node) {
        return (
            <div id="details">
                <div>output: {state.node.mainProduct.name} - {state.node.getAmountPerMin() + "/m"}</div>
                <div>ingredients:</div>
                {
                    state.node.ingredients.map((ingredient, index) => {
                        return <div key={index}>
                            <span>{ingredient.name} - {ingredient.amountPerMin + "/m"}</span>
                            <span>
                            <select>
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