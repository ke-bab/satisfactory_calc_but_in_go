import {action, makeObservable, observable} from "mobx";
import {EventBus} from "../../Bus";
import {Recipe} from "../../GameData/Recipe";
import {events as partEvents} from "../Part/PartState";


export const events = {
    recipeChanged: 'recipe-changed'
}

export class RecipeState {
    /** @type {Recipe[]}*/
    recipes = []
    /** @type {?Recipe}*/
    selectedRecipe = null

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
        EventBus.publish(events.recipeChanged, this.selectedRecipe)
    }

    handleRecipeChanged(e) {
        let recipe = this.recipes.find((r) => r.name === e.target.value)
        EventBus.publish(events.recipeChanged, recipe ? recipe : null)
    }


    loadRecipes(part) {
        fetch('/find-recipe-by-product?product=' + part)
            .then((response) => response.json())
            .then((recipeList) => {
                this.setRecipes(recipeList.map(this.makeRecipeFromObject))
            })
            .catch(error => {
                this.setRecipes([])
            })
    }

    makeRecipeFromObject(recipeObject) {
        const newRecipe = new Recipe()
        newRecipe.name = recipeObject.name
        newRecipe.displayName = recipeObject.displayName
        newRecipe.ingredients = recipeObject.ingredients
        newRecipe.products = recipeObject.products
        newRecipe.manufactoringDuration = recipeObject.manufactoringDuration
        newRecipe.producedIn = recipeObject.producedIn

        return newRecipe
    }
}