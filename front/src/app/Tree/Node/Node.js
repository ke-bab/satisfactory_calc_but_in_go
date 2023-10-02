import {observer} from "mobx-react-lite";
import {Ingredient} from "./NodeState";

function Node({state, keyK: index}) {

    function getWidthHeight(len) {
        let w = 100
        let h = 100

        if (len === 2) {
            w = 50
        }
        if (len === 3 || len === 4) {
            w = 50
            h = 50
        }

        return {
            width: w + '%',
            height: w + '%',
        }
    }


    /**
     *
     * @param {Ingredient} ingredient
     * @param {number} index
     * @return {JSX.Element}
     */
    function mapIngredients(ingredient, index) {

        const styles = getWidthHeight(state.ingredients.length)

        return <div key={index} style={styles} className="ingredient">
            <img className="image" src="/static/images/Assembler.png" alt=""/>
            <div className="count">{ingredient.amountPerMin  + '/m'}</div>
        </div>
    }

    return (
        <div className={"cell"} key={index} onClick={(e) => state.handleClick(e)}>
            <div className="left">
                <img src="/static/images/Assembler.png" alt=""/>
                <div>x1</div>
            </div>
            <div className="right">
                {
                    state.ingredients.map(mapIngredients)
                }
            </div>
        </div>
    )
}

export default observer(Node)

//
// export class RecipeNode {
//     /** @type {Recipe} */
//     recipe
//     /** @type {number} */
//     multiplier = 1.0
//     size = 1
//     /** @type {View} */
//     view
//     /** @type {Ingredient[]} */
//     ingredients = []
//     nodeControl
//     /** @type {?Ingredient} */
//     parentIngredient = null
//
//     /**
//      * @param {Recipe} recipe
//      */
//     constructor(recipe) {
//         this.recipe = recipe;
//         this.view = new View(this)
//         this.nodeControl = new NodeControl(this)
//         this.createIngredients()
//         EventBus.publish(events.created, this)
//     }
//
//     createIngredients() {
//         this.recipe.ingredients.forEach((ingredient) => {
//             this.ingredients.push(
//                 new Ingredient(ingredient.name, ingredient.amount, this)
//             )
//         })
//     }
//
//     /**
//      *
//      * @param {Part} part
//      * @param {?Recipe} recipe
//      */
//     setRecipeForIngredient(part, recipe) {
//         console.log('setRecipeForIngredient')
//         console.log(this.ingredients)
//         console.log(part)
//         let nodeIngredient = this.ingredients.find((node) => node.name === part.name)
//         if (recipe !== null) {
//             nodeIngredient.setConnectedRecipeNode(recipe)
//         } else {
//             nodeIngredient.setConnectedRecipeNode(null)
//         }
//     }
//
//     /**
//      * @param {number} left
//      * @param {number} top
//      */
//     setPos(left, top) {
//         this.view.setPos(left, top)
//     }
//
//     dropNodeControl() {
//         this.nodeControl.drop()
//         this.nodeControl = null
//     }
//
//     dropView() {
//         this.view.drop()
//         this.view = null
//     }
//
//     /**
//      * @param {Ingredient} ingredient
//      */
//     dropChildNode(ingredient) {
//         ingredient.connectedRecipeNode.drop(false)
//         ingredient.connectedRecipeNode = null
//     }
//
//     drop(sendEvent = true) {
//         this.dropNodeControl()
//         this.dropView()
//         // drop children recursively
//         this.ingredients.forEach((ingredient) => {
//             if (ingredient.connectedRecipeNode instanceof RecipeNode) {
//                 this.dropChildNode(ingredient)
//             }
//         })
//         if (sendEvent) {
//             EventBus.publish(events.dropped)
//         }
//     }
//
//     /**
//      * @return {Ingredient[]}
//      */
//     getIngredientsWithConnectedNodes() {
//         let result = []
//         for (let i = 0; i < this.ingredients.length; i++) {
//             if (this.ingredients[i].connectedRecipeNode !== null) {
//                 result.push(this.ingredients[i])
//             }
//         }
//         return result
//     }
//
//     updateSizeRecursive() {
//         this.size = 0
//         let ingredients = this.getIngredientsWithConnectedNodes()
//         if (ingredients.length === 0) {
//             this.size = 1
//         } else {
//             for (let i = 0; i < ingredients.length; i++) {
//                 this.size += ingredients[i].connectedRecipeNode.size
//             }
//         }
//         if (this.parentIngredient !== null) {
//             this.parentIngredient.parentRecipeNode.updateSizeRecursive()
//         }
//     }
// }
//
//
// class View {
//     divNode = document.createElement("div")
//
//     constructor(model) {
//         this.node = model
//         this.createCell()
//     }
//
//     drop() {
//         this.divNode.remove()
//     }
//
//     createCell() {
//         let gridDiv = document.querySelector("#grid")
//
//         this.divNode.classList.add("cell")
//
//         let leftDiv = document.createElement('div')
//         leftDiv.classList.add("left")
//         let rightDiv = document.createElement('div')
//         rightDiv.classList.add("right")
//
//         this.divNode.appendChild(leftDiv)
//         this.divNode.appendChild(rightDiv)
//
//         this.createIngredientDivs(rightDiv)
//
//         let factoryImage = document.createElement('img')
//         factoryImage.src = '/static/images/Assembler.png'
//         leftDiv.appendChild(factoryImage)
//         let factoryCount = document.createElement('div')
//         factoryCount.innerHTML = 'x' + this.node.multiplier
//         leftDiv.appendChild(factoryCount)
//
//         gridDiv.appendChild(this.divNode)
//
//         this.divNode.addEventListener('click', (event) => {
//             EventBus.publish(events.clicked, this.node)
//         })
//     }
//
//     /**
//      * @param {HTMLElement} rightDiv
//      */
//     createIngredientDivs(rightDiv) {
//         this.node.recipe.ingredients.forEach((ingredient) => {
//             let ingredientDiv = document.createElement('div')
//             ingredientDiv.classList.add('ingredient')
//             let w = 100
//             let h = 100
//             let len = this.node.recipe.ingredients.length
//             if (len === 2) {
//                 w = 50
//             }
//             if (len === 3 || len === 4) {
//                 w = 50
//                 h = 50
//             }
//             ingredientDiv.style.width = w + '%'
//             ingredientDiv.style.height = h + '%'
//
//             let image = document.createElement('img')
//             image.src = '/static/images/Assembler.png'
//             image.classList.add('image')
//             let countDiv = document.createElement('div')
//             countDiv.classList.add('count')
//             countDiv.style.fontSize = len === 1 ? "1em" : "0.5em"
//             countDiv.innerHTML = ingredient.amount + '/m'
//             ingredientDiv.appendChild(image)
//             ingredientDiv.appendChild(countDiv)
//             rightDiv.appendChild(ingredientDiv)
//         })
//     }
//
//     /**
//      * @param {number} left
//      * @param {number} top
//      */
//     setPos(left, top) {
//         this.divNode.style.left = left + "em"
//         this.divNode.style.top = top + "em"
//     }
// }