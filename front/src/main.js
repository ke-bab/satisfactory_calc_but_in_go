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

class Product {
    name = ''
    amount = 0
}

class Ingredient {
    name = ''
    amount = 0
    recipeConnected = false
}

class RecipeNode {
    /** @type {Recipe} */
    recipe
    /** @type {number} */
    multiplier= 1.0
    /** @type {?HTMLElement} */
    element = null
    size = 1
    /** @type {?RecipeNode} */
    parentNode = null
    /** @type {RecipeNode[]} */
    childNodes = []

    /**
     * @param {Recipe} recipe
     */
    constructor(recipe) {
        this.recipe = recipe;
    }

    removeIngredientRecipe() {

    }

    /**
     * @param {RecipeNode} newRecipe
     */
    addIngredientRecipe(newRecipe) {
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
     * @param {HTMLElement} element
     */
    setHTMLElement(element) {
        this.element = element
    }
}


/**
 * @param {RecipeNode} recipeNode
 * @param {Position} pos
 * @param deepLevel
 */
function renderRecursive(recipeNode, pos, deepLevel = 0) {
    createCell(pos.x, pos.y, recipeNode, deepLevel)
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
function createCell(x, y, recipeNode, deepLevel) {
    let gridDiv = document.querySelector("#grid")
    let cell = document.createElement("div")
    cell.recipeNode = recipeNode
    recipeNode.setHTMLElement(cell)

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
    factoryCount.innerHTML = 'x2'
    leftDiv.appendChild(factoryCount)


    gridDiv.appendChild(cell)
}

/**
 * @param {HTMLElement} rightDiv
 * @param {RecipeNode} recipeNode
 */
function createIngredientDivs(rightDiv, recipeNode) {
    recipeNode.recipe.ingredients.forEach((ingredient) => {
        let ingredientDiv = document.createElement('div')
        ingredientDiv.classList.add('ingredient')
        let image = document.createElement('img')
        image.src = '/static/images/Assembler.png'
        image.classList.add('image')
        let countDiv = document.createElement('div')
        countDiv.classList.add('count')
        countDiv.innerHTML = ingredient.amount + ' p/m'
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
        });
    let wanted_resource_input = document.querySelector('#wanted_resource_input')

    wanted_resource_input.addEventListener('change', (e) => {
        if (e.target.value === '') {
            return
        }
        fetch('/find-recipe-by-product?product=' + e.target.value)
            .then((response) => response.json())
            .then((json) => fillRecipeOptions(json))
            .catch(error => {
                document.querySelector('#recipe_select').style.display = 'none'
                document.querySelector('#amount').style.display = 'none'
            })
    })
    let recipe_select = document.querySelector('#recipe_select')
    recipe_select.addEventListener('change', (event) => {
        let recipe = event.target.options[event.target.selectedIndex].recipe
        fillAmount(recipe)

        let ironIngot = new RecipeNode(recipe)

        renderRecursive(ironIngot, new Position())
    })
};

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
 * @param {Recipe[]} list
 */
function fillRecipeOptions(list) {
    let recipe_select = document.querySelector('#recipe_select')
    recipe_select.innerHTML = ''
    recipe_select.style.display = 'block'
    list.forEach((recipe, index) => {
        let opt = document.createElement("option")
        opt.value = recipe.name
        opt.innerHTML = recipe.displayName
        opt.recipe = recipe
        recipe_select.appendChild(opt)
    })
    recipe_select.dispatchEvent(new Event("change"))
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

// main begin
const width = 6
const height = 3
