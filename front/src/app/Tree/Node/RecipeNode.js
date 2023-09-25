import {EventBus} from "../../bus";
import {Recipe} from "../../GameData/Recipe";
import {Ingredient} from "./Ingredient";
import {Part} from "../../GameData/Part";
import {NodeControl} from "./NodeControl/NodeControl";

export const events = {
    nodeCreated: 'node-created',
    nodeHtmlCreated: 'node-html-created',
    nodeDropped: 'node-dropped',
}

export class RecipeNode {
    /** @type {Recipe} */
    recipe
    /** @type {number} */
    multiplier = 1.0
    size = 1
    /** @type {Ingredient[]} */
    ingredients = []
    view = new View(this)
    nodeControl = new NodeControl(this)
    /** @type {?Ingredient} */
    parentIngredient = null

    /**
     * @param {Recipe} recipe
     */
    constructor(recipe) {
        this.recipe = recipe;
        this.view.createCell(this)
        EventBus.publish(events.nodeCreated, this)
    }

    /**
     * @param {number} left
     * @param {number} top
     */
    setPos(left, top) {
        this.view.setPos(left, top)
    }

    drop(sendEvent = true) {
        this.nodeControl.drop()
        this.view.drop()
        // drop children recursively
        this.ingredients.forEach((ingredient) => {
            if (ingredient.connectedRecipeNode instanceof RecipeNode) {
                ingredient.connectedRecipeNode.drop(false)
            }
        })
        if (sendEvent) {
            EventBus.publish(events.nodeDropped)
        }
    }

    /**
     * @return {Ingredient[]}
     */
    getIngredientsWithConnectedNodes() {
        return this.ingredients.filter((ingredient) => ingredient.connectedRecipeNode instanceof RecipeNode, [])
    }

    updateSizeRecursive() {
        this.size = 0
        let ingredients = this.getIngredientsWithConnectedNodes()
        if (ingredients.length === 0) {
            this.size = 1
        } else {
            for (let i = 0; i < ingredients.length; i++) {
                this.size += ingredients[i].connectedRecipeNode.size
            }
        }
        if (this.parentIngredient !== null) {
            this.parentIngredient.parentRecipeNode.updateSizeRecursive()
        }
    }
}


class View {
    divNode = document.createElement("div")

    constructor(model) {
        this.model = model
    }

    drop() {
        this.divNode.remove()
    }

    /**
     * @param {RecipeNode} recipeNode
     * @return HTMLDivElement
     */
    createCell(recipeNode) {
        let gridDiv = document.querySelector("#grid")
        let cell = this.divNode
        cell.recipeNode = recipeNode
        recipeNode.cell = cell

        cell.classList.add("cell")

        let leftDiv = document.createElement('div')
        leftDiv.classList.add("left")
        let rightDiv = document.createElement('div')
        rightDiv.classList.add("right")

        cell.appendChild(leftDiv)
        cell.appendChild(rightDiv)

        this.createIngredientDivs(rightDiv, recipeNode)

        let factoryImage = document.createElement('img')
        factoryImage.src = '/static/images/Assembler.png'
        leftDiv.appendChild(factoryImage)
        let factoryCount = document.createElement('div')
        factoryCount.innerHTML = 'x' + recipeNode.multiplier
        leftDiv.appendChild(factoryCount)

        gridDiv.appendChild(cell)

        this.registerCellEvent()
        EventBus.publish(events.nodeHtmlCreated, this)

        return cell
    }

    registerCellEvent() {
        let cells = document.querySelectorAll('.cell')
        cells.forEach((cell) => cell.addEventListener('click', (event) => {
            document.querySelectorAll('.selected-node-control').forEach((el) => el.style.display = 'none')
            event.target.closest('.cell').nodeControl.style.display = 'block'
        }))
    }


    /**
     * @param {HTMLElement} rightDiv
     * @param {RecipeNode} recipeNode
     */
    createIngredientDivs(rightDiv, recipeNode) {
        recipeNode.recipe.ingredients.forEach((ingredient) => {
            let ingredientDiv = document.createElement('div')
            ingredientDiv.classList.add('ingredient')
            let w = 100
            let h = 100
            let len = recipeNode.recipe.ingredients.length
            if (len === 2) {
                w = 50
            }
            if (len === 3 || len === 4) {
                w = 50
                h = 50
            }
            ingredientDiv.style.width = w + '%'
            ingredientDiv.style.height = h + '%'

            let image = document.createElement('img')
            image.src = '/static/images/Assembler.png'
            image.classList.add('image')
            let countDiv = document.createElement('div')
            countDiv.classList.add('count')
            countDiv.style.fontSize = len === 1 ? "1em" : "0.5em"
            countDiv.innerHTML = ingredient.amount + '/m'
            ingredientDiv.appendChild(image)
            ingredientDiv.appendChild(countDiv)
            rightDiv.appendChild(ingredientDiv)
        })
    }

    /**
     * @param {number} left
     * @param {number} top
     */
    setPos(left, top) {
        this.divNode.style.left = left + "em"
        this.divNode.style.top = top + "em"
    }
}