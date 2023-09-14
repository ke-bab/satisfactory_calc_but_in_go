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
}

class RecipeNode {
    /** @type {RecipeNode[]} */
    childNodes;
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
let v = grid.getGrid()
grid.setCell(0,0 ,"recipe1")
grid.setCell(1,0 ,"recipe1")
grid.setCell(1,3 ,"recipe1")

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