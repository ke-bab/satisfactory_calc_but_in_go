// let cells = document.querySelectorAll(".cell")
//
// cells[1].style.left = "8em"

let grid = []

// high level api for UI
// set recipe
// remove recipe (set to null)

// api for positioning (model layer)
// resize recipe (global recursive)
// insert recipe into cell in grid

// api for visual render
// render
// create cell

grid[0] = []
grid[1] = []
grid[0][0] = "recipe1"
grid[1][0] = "recipe2"
grid[1][3] = "recipe3"

const width = 6
const height = 3

render(grid)

/**
 * @param {Array.<Array>} grid
 */
function render(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            createCell(i,j, grid[i][j])
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