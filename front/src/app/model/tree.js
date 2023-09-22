import {removeRecipeNodesDivsRecursive, Render} from "./html/render";
import {EventBus} from "../bus";

export class Tree {
    /** @type ?RecipeNode */
    root = null

    /**
     * @param {Recipe} recipe
     */
    changeRoot(recipe) {
        this.removeSubTree(this.root)
        this.root = new RecipeNode(recipe)
    }


    /**
     * @param {RecipeNode} startNode
     */
    removeSubTree(startNode) {
        startNode.childNodes.forEach((node) => this.removeSubTree(node))
        startNode.removeHtml()
    }
}


export class RecipeNode {
    /** @type {Recipe} */
    recipe
    /** @type {number} */
    multiplier = 1.0
    /** @type {HTMLElement} */
    cell = new HTMLElement()
    /** @type {HTMLElement} */
    cellControl = new HTMLElement()
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


export function clearTree() {
    document.querySelector('#recipe_select').style.display = 'none'
    document.querySelector('#amount').style.display = 'none'
    document.querySelector('#grid').innerHTML = ''
    document.querySelector('#root-control').recipeNode = undefined
    document.querySelectorAll('.cell').forEach((element) => element.remove())
    document.querySelectorAll('.selected-node-control').forEach((element) => element.remove())
}


/**
 * @param {Recipe} recipe
 */
export function fillAmount(recipe) {
    let amountEl = document.querySelector('#amount')
    amountEl.style.display = 'block'
    // add img src
    let amount_input = document.querySelector("#amount_input")
    let wanted_input = document.querySelector('#wanted_resource_input')
    let resource = getProduct(wanted_input.value, recipe.products)
    amount_input.value = 60 / recipe.manufactoringDuration * resource.amount
}


/**
 * @param {string} name
 * @param {Resource[]} res
 * @return {?Resource}
 */
export function getProduct(name, res) {
    return res.find((r) => r.name === name, null)
}


export class Recipe {
    name = ''
    displayName = ''
    /** @type {Resource[]} */
    ingredients = []
    /** @type {Resource[]} */
    products = []
    manufactoringDuration = 1
    producedIn = ''
}


export class TotalNeeds {
    /** @type {Map<string, number>} */
    resources = new Map()

    add(name, amount) {
        let mapAmount = this.resources.get(name)
        if (mapAmount !== undefined) {
            this.resources.set(name, mapAmount + amount)
        } else {
            this.resources.set(name, amount)
        }
        this.update(name)
    }

    remove(name, amount) {

    }

    update(name) {
        let total = document.querySelector('#total')
        let divs = total.getElementsByTagName('div')
        let nameDiv = undefined
        for (let i = 0; i < divs.length; i++) {
            if (name === divs[i].innerText) {
                nameDiv = divs[i]
                break
            }
        }
        // let nameDiv = divs.find((div) => div.innerText === name)
        if (nameDiv !== undefined) {
            alert('not implemented')
        } else {
            let newTotalDiv = document.createElement('div')
            let totalNameDiv = document.createElement('div')
            let totalAmountDiv = document.createElement('div')
            newTotalDiv.appendChild(totalNameDiv)
            newTotalDiv.appendChild(totalAmountDiv)
            total.appendChild(newTotalDiv)
            totalAmountDiv.innerText = this.resources.get(name) + ''
        }
    }
}


export class Resource {
    name
    amount
}


export const width = 10
export const height = 5
export let totalNeeds = new TotalNeeds()
