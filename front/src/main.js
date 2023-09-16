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

class RecipeNode {
    name = ''
    size = 1
    /** @type {?RecipeNode} */
    parentNode = null
    /** @type {RecipeNode[]} */
    ingredients = []

    constructor(name) {
        this.name = name;
    }

    removeIngredientRecipe() {
        // todo: implement
    }

    /**
     * @param {RecipeNode} newRecipe
     */
    addIngredientRecipe(newRecipe) {
        newRecipe.parentNode = this
        this.ingredients.push(newRecipe)
        this.updateSizeRecursive()
    }

    updateSizeRecursive() {
        this.size = 0
        if (this.ingredients.length === 0) {
            this.size = 1
        } else {
            for (let i = 0; i < this.ingredients.length; i++) {
                this.size += this.ingredients[i].size
            }
        }
        if (this.parentNode !== null) {
            this.parentNode.updateSizeRecursive()
        }
    }

}

// ui api
// set recipe
// remove recipe (set to null)

// logic model api
// resize recipe (global recursive)
// insert recipe into cell in grid

// render api
// render
// create cell


/**
 * @param {RecipeNode} recipe
 * @param {Position} pos
 */
function renderRecursive(recipe, pos) {
    createCell(pos.x, pos.y, recipe.name)
    for (let i = 0; i < recipe.ingredients.length; i++) {
        let y = pos.y + i
        if (i > 0) {
            y = pos.y + i + (recipe.ingredients[i-1].size -1)
        }
        renderRecursive(
            recipe.ingredients[i],
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
    const newDiv = document.createElement("div")
    newDiv.classList.add("cell")
    newDiv.style.left = x * width + "em"
    newDiv.style.top = y * height + "em"
    const text = document.createTextNode(content)
    newDiv.appendChild(text)
    gridDiv.appendChild(newDiv)
}


// main begin
const width = 6
const height = 3

let rec1 = new RecipeNode("iron ingot")
let ironOre = new RecipeNode("iron ore")
rec1.addIngredientRecipe(ironOre)
ironOre.addIngredientRecipe(new RecipeNode("iron some1"))
ironOre.addIngredientRecipe(new RecipeNode("iron some 2"))
let copper = new RecipeNode("copper ore")
rec1.addIngredientRecipe(copper)
copper.addIngredientRecipe(new RecipeNode("copper sheet"))
copper.addIngredientRecipe(new RecipeNode("copper ingot"))

renderRecursive(rec1, new Position())