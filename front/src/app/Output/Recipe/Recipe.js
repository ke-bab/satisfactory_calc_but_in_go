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
            {state.selectedRecipe !== null
                ?
                <div id="recipe-selected-wrapper" onClick={(e) => state.handleClick(e)}>
                    <div id="recipe-selected">
                        {state.selectedRecipe.displayName}
                        {state.selectedRecipe.ingredients.map((i) => {
                            return <div className="recipe-ingredient">
                                <img className="recipe-ingredient-image" src={i.imgSrc40px()} alt=""/>
                                <div className="recipe-ingredient-amount">{i.amountPerMin(state.selectedRecipe)}/min</div>
                            </div>
                        })}
                    </div>
                    <img className="arrow-down" src="/static/images/arrow-down.svg" alt=""/>
                </div>
                : <div id="recipe-selected">&lt;recipe not selected&gt;</div>
            }


            {state.droppedDown
                ?
                <div id="recipe-options">
                    {state.recipes.map((recipe, index) =>
                        <div key={recipe.name} className="recipe-option"
                             onClick={() => state.handleOptionClick(recipe)}>
                            {recipe.displayName}
                            {recipe.ingredients.map((i) => {
                                return <div className="recipe-ingredient">
                                    <img className="recipe-ingredient-image" src={i.imgSrc40px()} alt=""/>
                                    <div className="recipe-ingredient-amount">{i.amountPerMin(recipe)}/min</div>
                                </div>

                            })}
                        </div>
                    )}
                </div>
                : null
            }

        </div>
    )
}

export default observer(Recipe)
