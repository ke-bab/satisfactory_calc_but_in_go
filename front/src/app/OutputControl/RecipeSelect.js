import {EventBus} from "../Bus";
import {events as partSearchEvents} from "./PartSearch";
import {Recipe} from "../GameData/Recipe";
import {useEffect, useState} from "react";

export const events = {
    recipeChanged: 'recipe-changed'
}


export function RecipeSelect() {
    const [show, setShow] = useState(false)
    const [recipes, setRecipes] = useState(
        /** @type {Recipe[]} */
        []
    )
    const [subscribed, setSubscribed] = useState(false)

    if (!subscribed) {
        EventBus.subscribe(partSearchEvents.partChanged, (part) => handlePartChanged(part))
        setSubscribed(true)
    }

    function handlePartChanged(part) {
        console.log("handlePartChanged")
        if (part === '') {
            setShow(false)
            setRecipes([])
        } else {
            loadRecipes(part)
        }
    }

    function loadRecipes(part) {
        fetch('/find-recipe-by-product?product=' + part)
            .then((response) => response.json())
            .then((recipeList) => {
                setRecipes(recipeList)
                setShow(true)
            })
            .catch(error => {
                setShow(false)
                setRecipes([])
            })
    }


    function handleChange(event) {
        let recipe = recipes.find((r) => r.name === event.target.value)
        EventBus.publish(events.recipeChanged, recipe)
    }

    if (show) {
        return (
            <select onChange={handleChange}>
                <option value="">not selected</option>
                {recipes.map((recipe, index) =>
                    <option key={index} value={recipe.name}>{recipe.displayName}</option>
                )}
            </select>
        )
    } else {
        return null
    }
}