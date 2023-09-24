import {EventBus} from "../../bus";
import {Recipe} from "../../GameData/Recipe";
import {Ingredient} from "./Ingredient";
import {Part} from "../../GameData/Part";

export const events = {
    nodeCreated: 'node-created',
    nodeHtmlCreated: 'node-html-created',
}

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

    /** @type {Ingredient[]} */
    ingredients = []
    view = new View(this)

    /**
     * @param {Recipe} recipe
     */
    constructor(recipe) {
        this.recipe = recipe;
        this.view.createCell(this)
        EventBus.publish(events.nodeCreated, this)
    }



    removeHtml() {
        this.cell.nodeControl.remove()
        this.cell.remove()
    }

    /**
     * @param {RecipeNode} recipeNode
     */
    removeRecipeByProduct(recipeNode) {
        this.removeRecipeNodesDivsRecursive(recipeNode)
        let index = this.childNodes.indexOf(recipeNode)
        this.childNodes.splice(index, 1)
    }


    /**
     * @param {RecipeNode} recipeNode
     */
    removeRecipeNodesDivsRecursive(recipeNode) {
        recipeNode.childNodes.forEach((childNode) => {
            this.removeRecipeNodesDivsRecursive(childNode)
        })
        recipeNode.cell.nodeControl.remove()
        recipeNode.cell.remove()
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


class View {

    constructor(model) {
        this.model = model
    }
    /**
     * @param {RecipeNode} recipeNode
     * @return HTMLDivElement
     */
    createCell(recipeNode) {
        console.log("createCell")
        let gridDiv = document.querySelector("#grid")
        let cell = document.createElement("div")
        cell.recipeNode = recipeNode
        recipeNode.setCell(cell)

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
        let nodeControl = document.createElement('div')
        nodeControl.classList.add('selected-node-control')
        nodeControl.style.display = 'none'
        cell.nodeControl = nodeControl
        nodeControl.cell = cell
        let leftPanel = document.querySelector('#left-panel')
        leftPanel.appendChild(nodeControl)
        recipeNode.recipe.ingredients.forEach((ingredient) => {
            this.createIngredientRecipeSelector(ingredient, nodeControl)
        })
        this.registerCellEvent()
        EventBus.publish(events.nodeHtmlCreated, this)

        return cell
    }

    /**
     * @param {Part} ingredient
     * @param {HTMLElement} nodeControl
     */
    createIngredientRecipeSelector(ingredient, nodeControl) {
        let ingredientDiv = document.createElement('div')
        let image = document.createElement('img')
        let select = document.createElement('select')
        select.addEventListener('change', (event) => {
            let recipeNode = nodeControl.cell.recipeNode
            let newNode = new RecipeNode(event.target.options[event.target.selectedIndex].recipe)
            newNode.mainProduct = ingredient.name
            recipeNode.addIngredientRecipe(newNode)
            // add to total
        })
        let emptyOption = document.createElement('option')
        emptyOption.value = ''
        emptyOption.innerHTML = 'no recipe'
        select.appendChild(emptyOption)
        nodeControl.appendChild(ingredientDiv)
        ingredientDiv.appendChild(image)
        ingredientDiv.appendChild(select)
        /** @param {Recipe[]} recipes */
        let fillSelect = (recipes) => {
            recipes.forEach((recipe) => {
                let newOpt = document.createElement('option')
                newOpt.value = recipe.name
                newOpt.recipe = recipe
                newOpt.innerHTML = recipe.displayName
                select.appendChild(newOpt)
            })
        }
        fetch('/find-recipe-by-product?product=' + ingredient.name)
            .then((resp) => resp.json())
            .then((json) => fillSelect(json))
            .catch(() => {
            })
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
}