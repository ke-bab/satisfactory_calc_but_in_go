import {EventBus} from "../bus";
import {removeRecipeNodesDivsRecursive} from "./html/Render";
import {Recipe} from "./Recipe";

export class RecipeNode {
    /** @type {Recipe} */
    recipe
    /** @type {number} */
    multiplier = 1.0
    /** @type {HTMLElement} */
    cell
    /** @type {HTMLElement} */
    cellControl
    size = 1
    /** @type {?RecipeNode} */
    parentNode = null
    mainProduct = ''
    /** @type {RecipeNode[]} */
    childNodes = []

    /**
     * @param {Recipe} recipe
     */
    constructor(recipe) {
        this.recipe = recipe;
        EventBus.publish('node-created', this)
    }

    removeHtml() {
        this.cell.nodeControl.remove()
        this.cell.remove()
    }

    /**
     * @param {RecipeNode} recipeNode
     */
    removeRecipeByProduct(recipeNode) {
        removeRecipeNodesDivsRecursive(recipeNode)
        let index = this.childNodes.indexOf(recipeNode)
        this.childNodes.splice(index, 1)
    }

    /**
     * @param {RecipeNode} newRecipe
     */
    addIngredientRecipe(newRecipe) {
        let foundNode = this.childNodes.find((recipeNode) => recipeNode.mainProduct === newRecipe.mainProduct)
        if (foundNode !== undefined) {
            this.removeRecipeByProduct(foundNode)
        }
        newRecipe.parentNode = this
        this.childNodes.push(newRecipe)
        this.updateSizeRecursive()
    }

    updateSizeRecursive() {
        this.size = 0
        if (this.childNodes.length === 0) {
            this.size = 1
        } else {
            for (let i = 0; i < this.childNodes.length; i++) {
                this.size += this.childNodes[i].size
            }
        }
        if (this.parentNode !== null) {
            this.parentNode.updateSizeRecursive()
        }
    }

    /**
     * @param {HTMLElement} cell
     */
    setCell(cell) {
        this.cell = cell
    }

    /**
     * @param {string} name
     * @return {boolean}
     */
    hasConnectedRecipeByIngredient(name) {
        let found = this.childNodes.find((node) => node.mainProduct === name)
        return found !== undefined;
    }
}
