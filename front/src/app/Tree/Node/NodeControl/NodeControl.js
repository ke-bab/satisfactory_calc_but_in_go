export class NodeControl {
    recipeNode
    view = new View(this)

    constructor(recipeNode) {
        this.recipeNode = recipeNode
    }
}

class View {
    constructor(model) {
        this.model = model
        let nodeControl = document.createElement('div')
        nodeControl.classList.add('selected-node-control')
        nodeControl.style.display = 'none'
        cell.nodeControl = nodeControl
        nodeControl.cell = cell
        let leftPanel = document.querySelector('#left-panel')
        leftPanel.appendChild(nodeControl)

        this.model.recipe.ingredients.forEach((ingredient) => {
            this.createIngredientRecipeSelector(ingredient, nodeControl)
        })
    }



    /**
     * @param {Part} ingredient
     * @param {HTMLElement} nodeControl
     */
    createIngredientRecipeSelector(ingredient, nodeControl) {
        let ingredientDiv = document.createElement('div')
        let image = document.createElement('img')
        let select = document.createElement('select')
        // select.addEventListener('change', (event) => {
        //     let recipeNode = nodeControl.cell.recipeNode
        //     let newNode = new RecipeNode(event.target.options[event.target.selectedIndex].recipe)
        //     newNode.mainProduct = ingredient.name
        //     recipeNode.addIngredientRecipe(newNode)
        //     // add to total
        // })
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
}