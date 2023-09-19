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
    /** @type {?HTMLElement} */
    element = null
    /** @type {Product} */
    product = null
    /** @type {Ingredient[]} */
    ingredients = []
    multiplier = 1.0
    name = ''
    size = 1
    /** @type {?RecipeNode} */
    parentNode = null
    /** @type {RecipeNode[]} */
    childNodes = []

    constructor(name) {
        this.name = name;
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
 * @param {RecipeNode} recipe
 * @param {Position} pos
 * @param deepLevel
 */
function renderRecursive(recipe, pos, deepLevel = 0) {
    createCell(pos.x, pos.y, recipe, deepLevel)
    deepLevel++
    for (let i = 0; i < recipe.childNodes.length; i++) {
        let y = pos.y + i
        if (i > 0) {
            y = pos.y + i + (recipe.childNodes[i - 1].size - 1)
        }
        renderRecursive(
            recipe.childNodes[i],
            new Position(pos.x + 1, y),
            deepLevel
        )
    }
}

/**
 * @param {number} x
 * @param {number} y
 * @param {RecipeNode} recipe
 * @param {number} deepLevel
 */
function createCell(x, y, recipe, deepLevel) {
    let gridDiv = document.querySelector("#grid")
    let cell = document.createElement("div")
    cell.recipe = recipe
    cell.id = recipe.name
    recipe.setHTMLElement(cell)


    cell.classList.add("cell")
    cell.style.left = x * width + (deepLevel) + "em"
    cell.style.top = y * height + "em"

    const leftSide = document.createElement("div")
    leftSide.style.width = width / 2 + "em"
    leftSide.style.height = height + "em"
    leftSide.style.display = "inline-block"

    const rightSide = document.createElement("div")
    rightSide.style.width = width / 2 + "em"
    rightSide.style.height = height + "em"
    rightSide.style.display = "inline-block"
    rightSide.style.boxSizing = "border-box"
    rightSide.style.border = "2px dashed gray"


    rightSide.addEventListener('mouseover', (event) => {
        event.target.style.borderColor = "black"
    })
    rightSide.addEventListener('mouseout', (event) => {
        event.target.style.borderColor = 'gray'
    })

    const image = document.createElement("img")
    image.src = "/static/images/Assembler.png"
    image.style.width = width / 2 + "em"

    cell.appendChild(leftSide)
    cell.appendChild(rightSide)
    leftSide.appendChild(image)

    gridDiv.appendChild(cell)
}


// main begin
const width = 6
const height = 3

jsonData = {}

let ironIngot = new RecipeNode("iron_ingot")
let ironOre = new RecipeNode("iron_ore")
ironIngot.addIngredientRecipe(ironOre)
ironOre.addIngredientRecipe(new RecipeNode("iron some1"))
ironOre.addIngredientRecipe(new RecipeNode("iron some 2"))
let copper = new RecipeNode("copper ore")
ironIngot.addIngredientRecipe(copper)
copper.addIngredientRecipe(new RecipeNode("copper sheet"))
copper.addIngredientRecipe(new RecipeNode("copper ingot"))


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


renderRecursive(ironIngot, new Position())