import {action, makeObservable, observable} from "mobx";
import {EventBus} from "../../Bus";
import {Recipe} from "../../GameData/Recipe";
import {events as partEvents} from "../Part/PartState";
import {events as itemSearchEvents} from "../../SearchBar/SearchBarState";
import {Part} from "../../GameData/Part";


export const events = {
    recipeChanged: 'recipe-changed'
}

export class RecipeState {
    show = false
    /** @type {Recipe[]}*/
    recipes = []
    /** @type {?Recipe}*/
    selectedRecipe = null

    setShow(show) {
        this.show = show
    }

    setRecipes(recipes) {
        this.recipes = recipes;
    }

    setSelectedRecipe(recipe) {
        this.selectedRecipe = recipe
    }


    constructor() {
        makeObservable(this, {
            recipes: observable,
            selectedRecipe: observable,
            setRecipes: action,
            setSelectedRecipe: action,
            show: observable,
            setShow: action,
        })

        EventBus.subscribe(itemSearchEvents.selected, (part) => {
            this.handleItemSelected(part)
        })
    }

    handleItemSelected(part) {
        this.loadRecipes(part)
        EventBus.publish(events.recipeChanged, this.selectedRecipe)
    }

    handleRecipeChanged(e) {
        let recipe = this.recipes.find((r) => r.name === e.target.value)
        this.setSelectedRecipe(recipe)
        EventBus.publish(events.recipeChanged, recipe ? recipe : null)
    }


    loadRecipes(part) {
        fetch('/find-recipe-by-product?product=' + part)
            .then((response) => response.json())
            .then((recipeList) => {
                this.setRecipes(recipeList.map(this.makeRecipeFromObject))
            })
            .catch(error => {
                console.log(error)
                this.setRecipes([])
            })
    }

    /**
     * @param {Recipe} recipeObject
     * @return {Recipe}
     */
    makeRecipeFromObject(recipeObject) {
        const newRecipe = new Recipe()
        newRecipe.name = recipeObject.name
        newRecipe.displayName = recipeObject.displayName
        newRecipe.ingredients = recipeObject.ingredients.map((i) => new Part(
            i.name,
            i.amount,
            i.displayName,
        ))
        newRecipe.products = recipeObject.products
        newRecipe.manufactoringDuration = recipeObject.manufactoringDuration
        newRecipe.producedIn = recipeObject.producedIn

        return newRecipe
    }
}