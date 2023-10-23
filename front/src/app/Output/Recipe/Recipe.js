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
                <div id="recipe-selected" onClick={(e) => state.handleClick(e)}>
                    {state.selectedRecipe.displayName}
                    {state.selectedRecipe.ingredients.map((i) => {
                        return <img src={i.imgSrc40px()} alt=""/>
                    })}
                    <img className="arrow-down" src="/static/images/arrow-down.svg" alt=""/>
                </div>
                : <div id="recipe-selected">recipe not selected</div>
            }


            {/*<select onChange={(e) => state.handleRecipeChanged(e)}*/}
            {/*        value={state.selectedRecipe ? state.selectedRecipe.name : ''}>*/}
            {/*    <option value="">not selected</option>*/}
            {/*    {state.recipes.map((recipe, index) =>*/}
            {/*        <option key={index} value={recipe.name}>{recipe.displayName}</option>*/}
            {/*    )}*/}
            {/*</select>*/}
            {state.droppedDown
                ?
                <div id="recipe-options">
                    {state.recipes.map((recipe, index) =>
                        <div key={recipe.name} className="recipe-option" onClick={()=> state.handleOptionClick(recipe)}>
                            {recipe.displayName}
                            {recipe.ingredients.map((i) => {
                                return <img src={i.imgSrc40px()} alt=""/>
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
