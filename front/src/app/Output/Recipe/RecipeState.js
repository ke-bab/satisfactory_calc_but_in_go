import {action, makeObservable, observable} from "mobx";
import {EventBus} from "../../Bus";
import {events as partEvents} from "../Part/Part";


export const events = {
    recipeChanged: 'recipe-changed'
}

export class RecipeState {
    recipes = []

    setRecipes(recipes) {
        this.recipes = recipes;
    }

    constructor() {
        makeObservable(this, {
            recipes: observable,
            setRecipes: action,
        })

        EventBus.subscribe(partEvents.partChanged, (part) => {
            this.handlePartChanged(part)
        })
    }

    handlePartChanged(part) {
        if (part === '') {
            this.setRecipes([])
        } else {
            this.loadRecipes(part)
        }
    }

    handleRecipeChanged(e) {
        let recipe = this.recipes.find((r) => r.name === e.target.value)
        EventBus.publish(events.recipeChanged, recipe ? recipe : null)
    }


    loadRecipes(part) {
        fetch('/find-recipe-by-product?product=' + part)
            .then((response) => response.json())
            .then((recipeList) => {
                this.setRecipes(recipeList)

            })
            .catch(error => {
                this.setRecipes([])
            })
    }
}