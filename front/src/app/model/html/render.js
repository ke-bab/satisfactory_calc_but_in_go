import {height, RecipeNode, totalNeeds, width} from "../tree";

export class Render {
    /** @type {?RecipeNode} */
    rootNode = null

    updatePositions(recipeNode = this.rootNode, pos = new Position(0, 0), deepLevel = 0) {
        if (recipeNode === null) {
            return
        }
        recipeNode.cell.style.left = pos.x * width + (deepLevel) + "em"
        recipeNode.cell.style.top = pos.y * height + "em"
        deepLevel++
        for (let i = 0; i < recipeNode.childNodes.length; i++) {
            let y = pos.y + i
            if (i > 0) {
                y = pos.y + i + (recipeNode.childNodes[i - 1].size - 1)
            }
            this.updatePositions(
                recipeNode.childNodes[i],
                new Position(pos.x + 1, y),
                deepLevel
            )
        }
    }


    /**
     * @param {RecipeNode} recipeNode
     * @return HTMLDivElement
     */
    createCell(recipeNode) {
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

        createIngredientDivs(rightDiv, recipeNode)

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
            createIngredientRecipeSelector(ingredient, nodeControl)
        })
        registerCellEvent()
        this.updatePositions()

        return cell
    }
}

export class Position {
    /** @type {number} */
    x
    /** @type {number} */
    y

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}


/**
 * @param {HTMLElement} rightDiv
 * @param {RecipeNode} recipeNode
 */
export function createIngredientDivs(rightDiv, recipeNode) {
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
 * @param {Resource} ingredient
 * @param {HTMLElement} nodeControl
 */
export function createIngredientRecipeSelector(ingredient, nodeControl) {
    let ingredientDiv = document.createElement('div')
    let image = document.createElement('img')
    let select = document.createElement('select')
    select.addEventListener('change', (event) => {
        let recipeNode = nodeControl.cell.recipeNode
        let newNode = new RecipeNode(event.target.options[event.target.selectedIndex].recipe)
        newNode.mainProduct = ingredient.name
        recipeNode.addIngredientRecipe(newNode)

        totalNeeds.add(ingredient.name, ingredient.amount)

        render()
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

export function registerCellEvent() {
    let cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => cell.addEventListener('click', (event) => {
        document.querySelectorAll('.selected-node-control').forEach((el) => el.style.display = 'none')
        event.target.closest('.cell').nodeControl.style.display = 'block'
    }))
}


/**
 * @param {RecipeNode} recipeNode
 */
export function removeRecipeNodesDivsRecursive(recipeNode) {
    recipeNode.childNodes.forEach((childNode) => {
        removeRecipeNodesDivsRecursive(childNode)
    })
    recipeNode.cell.nodeControl.remove()
    recipeNode.cell.remove()
}


/**
 * @param {Recipe[]} recipes
 */
export function fillRecipeOptions(recipes) {
    let recipe_select = document.querySelector('#recipe_select')
    recipe_select.innerHTML = ''
    let emptyOpt = document.createElement('option')
    emptyOpt.value = ''
    emptyOpt.innerHTML = 'no recipe'
    recipe_select.appendChild(emptyOpt)
    recipe_select.style.display = 'block'
    recipes.forEach((recipe, index) => {
        let opt = document.createElement("option")
        opt.value = recipe.name
        opt.innerHTML = recipe.displayName
        opt.recipe = recipe
        recipe_select.appendChild(opt)
    })
}


export class Option {
    name
    displayName
}


/**
 * @param {Option[]} list
 */
export function fillResourceNames(list) {
    let datalist = document.querySelector('#wanted_resource_list')
    for (let i = 0; i < list.length; i++) {
        let newOption = document.createElement("option")
        newOption.value = list[i].name
        newOption.innerHTML = list[i].displayName
        datalist.appendChild(newOption)
    }
}
