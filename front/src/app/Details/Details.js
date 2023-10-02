import {observer} from "mobx-react-lite";
import {useState} from "react";
import {DetailsState} from "./DetailsState";

function Details() {
    const [state] = useState(new DetailsState())

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