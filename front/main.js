class Grid {
    /** @type {string[][]} */
    grid = []

    setCell(x, y, text) {
        if (this.grid[x] === undefined) {
            this.grid[x] = []
        }
        this.grid[x][y] = text
    }

    getGrid() {
        return this.grid
    }

    /**
     * @param {?RecipeNode} parentRecipe
     * @param {RecipeNode} newRecipe
     */
    addRecipe(parentRecipe, newRecipe) {
        let x = 0
        let y = 0
        if (parentRecipe !== null) {
            x = parentRecipe.pos.x
            y = parentRecipe.pos.y
        }
        for (let i = 0; i < newRecipe.ingredients.length; i++) {
            let newPos = new Position()
            newPos.x = x + 1
            newPos.y = y + i
            newRecipe.ingredients[i].pos = newPos
        }
        if (parentRecipe !== null) {
            this.rearrangeRecipesRecursively(parentRecipe)
        }
    }

    /**
     * @param {RecipeNode} startRecipe
     */
    rearrangeRecipesRecursively(startRecipe) {
        startRecipe.refreshSize()
        // move lower recipes if any
        let lower = startRecipe.findRecipesLowerThanThat()

        let mostCloserRecipe = lower.reduce((prev, curr) => prev.pos.y < curr.pos.y ? prev : curr);

        let endCell = startRecipe.pos.y + startRecipe.size
        let diff = mostCloserRecipe.pos - endCell
        for (let i = 0; i < lower.length; i++) {
            mostCloserRecipe.modifyYRecursive(-diff)
        }
        //
        if (startRecipe.parentNode !== null) {
            this.rearrangeRecipesRecursively(startRecipe.parentNode)
        }
    }
}

class Position {
    /** @type {number} */
    x
    /** @type {number} */
    y
}

class RecipeNode {
    /** @type {number} */
    size
    /** @type {Position} */
    pos
    /** @type {?RecipeNode} */
    parentNode
    /** @type {RecipeNode[]} */
    ingredients
    /** @type {string} */
    recipe
    /** @type {Grid} */
    grid

    constructor(parentNode) {
        this.parentNode = parentNode
        this.ingredients = []
    }

    removeRecipe() {
        // todo: implement
    }

    refreshSize() {
        this.size = 1
        let sum = 0
        for (let i = 0; i < this.ingredients.length; i++) {
            sum += this.ingredients[0].size
        }
        if (sum < 1) {
            this.size = 1
        } else {
            this.size = sum
        }
    }

    /**
     * @return {RecipeNode[]}
     */
    findRecipesLowerThanThat() {
        if (this.parentNode === null) {
            return []
        }
        let recipes = []
        for (let i = 0; i < this.parentNode.ingredients.length; i++) {
            if (this.parentNode.ingredients[i].pos.y > this.pos.y) {
                recipes.push(this.parentNode.ingredients[i])
            }
        }

        return recipes
    }

    /**
     * @param {number} y
     */
    modifyYRecursive(y) {
        this.pos.y += y
        this.ingredients.forEach((recipe) => recipe.modifyYRecursive(y))
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


const width = 6
const height = 3

let grid = new Grid()

grid.addRecipe(null, new RecipeNode())

grid.setCell(0, 0, "recipe1")
grid.setCell(1, 0, "recipe1")
grid.setCell(1, 3, "recipe1")

render(grid.getGrid())

/**
 * @param {Array.<Array.<string>>} grid
 */
function render(grid) {
    let gridDiv = document.querySelector("#grid")
    gridDiv.innerHTML = ''
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            createCell(i, j, grid[i][j])
        }
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