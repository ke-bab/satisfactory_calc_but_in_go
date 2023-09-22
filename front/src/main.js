

class Position {
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
 * @param {RecipeNode} recipeNode
 */
function removeRecipeNodesDivsRecursive(recipeNode) {
    recipeNode.childNodes.forEach((childNode) => {
        removeRecipeNodesDivsRecursive(childNode)
    })
    recipeNode.cell.nodeControl.remove()
    recipeNode.cell.remove()
}

class RecipeNode {
    /** @type {Recipe} */
    recipe
    /** @type {number} */
    multiplier = 1.0
    /** @type {?HTMLElement} */
    cell = null
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

function render() {
    let root = document.querySelector('#root-control')
    renderRecursive(root.recipeNode, new Position())
}

/**
 * @param {RecipeNode} recipeNode
 * @param {Position} pos
 * @param deepLevel
 */
function renderRecursive(recipeNode, pos, deepLevel = 0) {
    createOrUpdateCell(pos.x, pos.y, recipeNode, deepLevel)
    deepLevel++
    for (let i = 0; i < recipeNode.childNodes.length; i++) {
        let y = pos.y + i
        if (i > 0) {
            y = pos.y + i + (recipeNode.childNodes[i - 1].size - 1)
        }
        renderRecursive(
            recipeNode.childNodes[i],
            new Position(pos.x + 1, y),
            deepLevel
        )
    }
}

/**
 * @param {number} x
 * @param {number} y
 * @param {?RecipeNode} recipeNode
 * @param {number} deepLevel
 */
function createOrUpdateCell(x, y, recipeNode, deepLevel) {
    let gridDiv = document.querySelector("#grid")
    if (recipeNode.cell !== null) {
        // update only
        recipeNode.cell.style.left = x * width + (deepLevel) + "em"
        recipeNode.cell.style.top = y * height + "em"
    } else {
        // create new
        let cell = document.createElement("div")
        cell.recipeNode = recipeNode
        recipeNode.setCell(cell)

        cell.classList.add("cell")
        cell.style.left = x * width + (deepLevel) + "em"
        cell.style.top = y * height + "em"

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
    }
}


/**
 * @param {HTMLElement} rightDiv
 * @param {RecipeNode} recipeNode
 */
function createIngredientDivs(rightDiv, recipeNode) {
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


window.onload = (event) => {
    fetch("/resource-name-list")
        .then((response) => response.json())
        .then((json) => {
            fillResourceNames(json)
        })
        .catch(() => {
        })
    let wanted_resource_input = document.querySelector('#wanted_resource_input')

    wanted_resource_input.addEventListener('change', (e) => {
        clearTree()
        if (e.target.value === '') {
            return
        }
        fetch('/find-recipe-by-product?product=' + e.target.value)
            .then((response) => response.json())
            .then((json) => fillRecipeOptions(json))
            .catch(error => {
                clearTree() // ?
            })
    })
    let recipe_select = document.querySelector('#recipe_select')
    recipe_select.addEventListener('change', (event) => {
        let recipe = event.target.options[event.target.selectedIndex].recipe
        fillAmount(recipe)
        let root = document.querySelector('#root-control')
        root.recipeNode = new RecipeNode(recipe)
        root.recipeNode.mainProduct = recipe_select.value
        render()
    })
};

function clearTree() {
    document.querySelector('#recipe_select').style.display = 'none'
    document.querySelector('#amount').style.display = 'none'
    document.querySelector('#grid').innerHTML = ''
    document.querySelector('#root-control').recipeNode = undefined
    document.querySelectorAll('.cell').forEach((element) => element.remove())
    document.querySelectorAll('.selected-node-control').forEach((element) => element.remove())
}

function registerCellEvent() {
    let cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => cell.addEventListener('click', (event) => {
        document.querySelectorAll('.selected-node-control').forEach((el) => el.style.display = 'none')
        event.target.closest('.cell').nodeControl.style.display = 'block'
    }))
}

/**
 * @param {Resource} ingredient
 * @param {HTMLElement} nodeControl
 */
function createIngredientRecipeSelector(ingredient, nodeControl) {
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

/**
 * @param {Recipe} recipe
 */
function fillAmount(recipe) {
    let amountEl = document.querySelector('#amount')
    amountEl.style.display = 'block'
    // add img src
    let amount_input = document.querySelector("#amount_input")
    let wanted_input = document.querySelector('#wanted_resource_input')
    let resource = getProduct(wanted_input.value, recipe.products)
    amount_input.value = 60 / recipe.manufactoringDuration * resource.amount
}

class Resource {
    name
    amount
}


/**
 * @param {string} name
 * @param {Resource[]} res
 * @return {?Resource}
 */
function getProduct(name, res) {
    return res.find((r) => r.name === name, null)
}

class Recipe {
    name = ''
    displayName = ''
    /** @type {Resource[]} */
    ingredients = []
    /** @type {Resource[]} */
    products = []
    manufactoringDuration = 1
    producedIn = ''
}

/**
 * @param {Recipe[]} recipes
 */
function fillRecipeOptions(recipes) {
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

class Option {
    name
    displayName
}

/**
 * @param {Option[]} list
 */
function fillResourceNames(list) {
    let datalist = document.querySelector('#wanted_resource_list')
    for (let i = 0; i < list.length; i++) {
        let newOption = document.createElement("option")
        newOption.value = list[i].name
        newOption.innerHTML = list[i].displayName
        datalist.appendChild(newOption)
    }
}


class TotalNeeds {
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

const width = 10
const height = 5
let totalNeeds = new TotalNeeds()
