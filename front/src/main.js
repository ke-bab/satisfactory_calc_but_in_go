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

}

/**
 * @param {RecipeNode} recipe
 * @param {Position} pos
 */
function renderRecursive(recipe, pos) {
    createCell(pos.x, pos.y, recipe.name)
    for (let i = 0; i < recipe.childNodes.length; i++) {
        let y = pos.y + i
        if (i > 0) {
            y = pos.y + i + (recipe.childNodes[i-1].size -1)
        }
        renderRecursive(
            recipe.childNodes[i],
            new Position(pos.x + 1, y)
        )
    }
}

/**
 * @param {number} x
 * @param {number} y
 * @param {string} content
 */
function createCell(x, y, content) {
    if (content === undefined) {
        return
    }
    let gridDiv = document.querySelector("#grid")
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.style.left = x * width + "em"
    cell.style.top = y * height + "em"

    const leftSide = document.createElement("div")
    leftSide.style.width = width / 2 + "em"
    const rightSide = document.createElement("div")
    rightSide.style.width = width / 2 + "em"
    rightSide.style.height = "37px"

    const  image = document.createElement("img")
    image.src = "./images/Biomass.png"
    image.style.width = "2em"

    cell.appendChild(leftSide)
    cell.appendChild(rightSide)
    leftSide.appendChild(image)

    gridDiv.appendChild(cell)
}


// main begin
const width = 6
const height = 3

jsonData = {

}

let ironIngot = new RecipeNode("iron ingot")
let ironOre = new RecipeNode("iron ore")
ironIngot.addIngredientRecipe(ironOre)
ironOre.addIngredientRecipe(new RecipeNode("iron some1"))
ironOre.addIngredientRecipe(new RecipeNode("iron some 2"))
let copper = new RecipeNode("copper ore")
ironIngot.addIngredientRecipe(copper)
copper.addIngredientRecipe(new RecipeNode("copper sheet"))
copper.addIngredientRecipe(new RecipeNode("copper ingot"))

renderRecursive(ironIngot, new Position())