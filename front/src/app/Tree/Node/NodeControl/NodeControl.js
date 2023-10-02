export const className = 'selected-node-control'

// export class NodeControl {
//     node
//     view
//
//     constructor(recipeNode) {
//         this.node = recipeNode
//         this.view = new View(this)
//         this.recipeSelectors = recipeNode.recipe.ingredients.map((part) => new Recipe(part, this.view.div, this))
//         EventBus.subscribe(nodeEvents.clicked, (node) => {this.handleNodeClick(node)})
//     }
//
//     handleNodeClick(node) {
//         if (node !== this.node) {
//             this.hide()
//         } else {
//             this.show()
//         }
//     }
//
//     hide() {
//         this.view.hide()
//     }
//
//     show() {
//         this.view.show()
//     }
//
//     drop() {
//         this.view.drop()
//     }
// }
//
// class View {
//     div = document.createElement('div')
//
//     constructor(model) {
//         this.model = model
//         this.div.classList.add(className)
//         this.hide()
//         let leftPanel = document.querySelector('#left-panel')
//         leftPanel.appendChild(this.div)
//
//         // this.model.recipe.ingredients.forEach((ingredient) => {
//         //     this.createIngredientRecipeSelector(ingredient, nodeControl)
//         // })
//     }
//
//     hide() {
//         this.div.classList.remove('shown')
//         this.div.classList.add('hidden')
//     }
//
//     show() {
//         this.div.classList.remove('hidden')
//         this.div.classList.add('shown')
//     }
//
//     drop() {
//         this.div.remove()
//     }
//
//
//     /**
//      * @param {Part} ingredient
//      * @param {HTMLElement} nodeControl
//      */
//     createIngredientRecipeSelector(ingredient, nodeControl) {
//         let ingredientDiv = document.createElement('div')
//         let image = document.createElement('img')
//         let select = document.createElement('select')
//         // select.addEventListener('change', (event) => {
//         //     let recipeNode = nodeControl.cell.recipeNode
//         //     let newNode = new RecipeNode(event.target.options[event.target.selectedIndex].recipe)
//         //     newNode.mainProduct = ingredient.name
//         //     recipeNode.addIngredientRecipe(newNode)
//         //     // add to total
//         // })
//         let emptyOption = document.createElement('option')
//         emptyOption.value = ''
//         emptyOption.innerHTML = 'no recipe'
//         select.appendChild(emptyOption)
//         nodeControl.appendChild(ingredientDiv)
//         ingredientDiv.appendChild(image)
//         ingredientDiv.appendChild(select)
//         /** @param {Recipe[]} recipes */
//         let fillSelect = (recipes) => {
//             recipes.forEach((recipe) => {
//                 let newOpt = document.createElement('option')
//                 newOpt.value = recipe.name
//                 newOpt.recipe = recipe
//                 newOpt.innerHTML = recipe.displayName
//                 select.appendChild(newOpt)
//             })
//         }
//         fetch('/find-recipe-by-product?product=' + ingredient.name)
//             .then((resp) => resp.json())
//             .then((json) => fillSelect(json))
//             .catch(() => {
//             })
//     }
// }