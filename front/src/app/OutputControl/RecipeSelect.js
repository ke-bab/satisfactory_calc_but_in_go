import {EventBus} from "../Bus";
import {events as partSearchEvents} from "./PartSearch";
import {Recipe} from "../GameData/Recipe";

export const events = {
    recipeChanged : 'recipe-changed'
}

export class RecipeSelect {
    /** @type {?Recipe}*/
    selectedRecipe = null
    recipes = []
    recipesSelect = document.querySelector('#recipe_select')
    constructor() {
        EventBus.subscribe(partSearchEvents.partChanged, (part) => {
            if (part === '') {
                this.hide()
                this.drop()
            } else {
                this.loadRecipes(part)
            }
        })
        this.recipesSelect.addEventListener('change', (event) => {
            this.selectedRecipe = this.recipesSelect.options[this.recipesSelect.selectedIndex].recipe
            EventBus.publish(events.recipeChanged, this.selectedRecipe)
        })
    }

    drop() {
        this.recipes = []
        this.recipesSelect.innerHTML = ''
    }

    hide() {
        this.recipesSelect.style.display = 'none'
    }

    /**
     * @param {string} part
     */
    loadRecipes(part) {
        fetch('/find-recipe-by-product?product=' + part)
            .then((response) => response.json())
            .then((recipeList) => {
                /** @type {Recipe[]} recipeList*/
                let recipes = this.convertToListOfRecipes(recipeList)
                this.setRecipes(recipes)
            })
            .catch(error => {
                this.hide()
                this.drop()
            })
    }

    /**
     * @param {object[]} objects
     */
    convertToListOfRecipes(objects) {
        let list = []
        objects.forEach((obj) => {
            const recipe = Object.assign(new Recipe(), obj)
            list.push(recipe)
        })

        return list
    }

    setRecipes(recipes) {
        this.recipes = recipes
        this.updateView()
    }

    updateView() {
        this.recipesSelect.innerHTML = ''
        if (this.recipes.length > 0) {
            this.recipesSelect.style.display = 'block'
            let emptyOpt = document.createElement('option')
            emptyOpt.value = ''
            emptyOpt.innerHTML = 'no recipe'
            emptyOpt.recipe = null
            this.recipesSelect.appendChild(emptyOpt)
            this.recipes.forEach((recipe, index) => {
                let opt = document.createElement("option")
                opt.value = recipe.name
                opt.innerHTML = recipe.displayName
                opt.recipe = recipe
                this.recipesSelect.appendChild(opt)
            })
        }
    }
}