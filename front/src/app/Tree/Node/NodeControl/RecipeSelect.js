import {Part} from '../../../GameData/Part'
import {Recipe} from "../../../GameData/Recipe";
import {EventBus} from "../../../Bus";

export const events = {
    changed: 'ingredient-recipe-changed'
}

export class RecipeSelect {
    /**
     * @type {View}
     */
    view
    /**
     * @type {Part}
     */
    part
    /** @type {Recipe[]} */
    recipes = []
    /** @type {?Recipe} */
    selectedRecipe

    /**
     * @param {Part} part
     * @param controlDiv
     */
    constructor(part, controlDiv) {
        this.part = part
        this.view = new View(this, controlDiv)
        this.fillOptions()
        this.listenChanges()
    }

    listenChanges() {
        this.view.select.addEventListener('change', () => {
            this.selectedRecipe = this.recipes.find((recipe) => this.view.select.value = recipe.name, null)
            EventBus.publish(events.changed, this)
        })
    }

    fillOptions() {
        fetch('/find-recipe-by-product?product=' + this.part.name)
            .then((response) => response.json())
            .then((recipeList) => {
                /** @type {Recipe[]} recipeList*/
                this.setRecipes(this.convertToListOfRecipes(recipeList))
            })
            .catch(error => {
                console.log(error)
            })
    }

    setRecipes(recipes) {
        this.recipes = recipes
        this.view.update()
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
}

class View {
    select
    outerDiv
    model
    /**
     * @param {RecipeSelect} model
     * @param {HTMLElement} controlDiv
     */
    constructor(model, controlDiv) {
        this.model = model;
        this.select = document.createElement('select')
        this.outerDiv = document.createElement('div')
        controlDiv.appendChild(this.outerDiv)
        this.outerDiv.appendChild(this.select)
    }

    update() {
        this.select.innerHTML = ''
        this.createOptions()
    }

    createOption(value, innerHTML) {
        let option = document.createElement('option')
        option.value = value
        option.innerHTML = innerHTML
        return option
    }

    createOptions() {
        let empty = this.createOption('', 'no recipe')
        this.select.appendChild(empty)
        this.model.recipes.forEach((r) => {
            /**
             * @type {Recipe} recipe
             */
            let recipe = r
            let newOpt = this.createOption(recipe.name, recipe.displayName)
            this.select.appendChild(newOpt)
        })
    }
}