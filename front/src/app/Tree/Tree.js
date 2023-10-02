import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {TreeState} from "./TreeState";
import Node from './Node/Node'
import {EventBus} from "../Bus";
import {events as recipeEvents} from "../Output/Recipe/RecipeState";
import {events as partEvents} from "../Output/Part/PartState";

function Tree() {
    const [state] = useState(new TreeState())

    useEffect(() => {
        EventBus.subscribe(recipeEvents.recipeChanged, (recipe)=> state.handleRecipeChanged(recipe))
        EventBus.subscribe(partEvents.partChanged, (part)=> state.handlePartChanged(part))
    }, []);

    return (
        <div id="tree">
            {state.getAllNodesAsList().map((nodeState, index) => {
                return <Node state={nodeState} key={index}/>
            })}
        </div>
    )
}

export default observer(Tree)


// export class Tree {
//     /** @type ?RecipeNode */
//     root = null
//     view = new View(this)
//
//     constructor() {
//         EventBus.subscribe(recipeSelectEvents.recipeChanged, (recipe) => this.handleRecipeChanged(recipe))
//         EventBus.subscribe(partSearchEvents.partChanged, () => this.handlePartSearchChanged())
//         EventBus.subscribe(ingredientEvents.connectedNodeChanged, () => this.handleNodeChanged())
//     }
//
//     handleNodeChanged() {
//         this.view.updatePositions()
//
//     }
//
//     handlePartSearchChanged() {
//         if (this.root instanceof RecipeNode) {
//             this.root.drop()
//         }
//     }
//
//     handleRecipeChanged(recipe) {
//         if (this.root instanceof RecipeNode) {
//             this.root.drop()
//             this.setRoot(null)
//         }
//         if (recipe instanceof Recipe) {
//             this.setRoot(new RecipeNode(recipe))
//         }
//     }
//
//     /**
//      * @param {?RecipeNode} recipeNode
//      */
//     setRoot(recipeNode) {
//         this.root = recipeNode
//     }
// }
//
// export const width = 10
// export const height = 5
//
// class View {
//
//     constructor(model) {
//         this.model = model
//     }
//
//     /**
//      *
//      * @param {?RecipeNode} recipeNode
//      * @param {Position} pos
//      * @param {number} deepLevel
//      */
//     updatePositions(recipeNode = this.model.root, pos = new Position(0, 0), deepLevel = 0) {
//         console.log('updatePositions')
//         // console.log(recipeNode)
//         // console.log(pos)
//         // console.log(deepLevel)
//         if (recipeNode === null) {
//             return
//         }
//
//         recipeNode.setPos(pos.x * width + (deepLevel), pos.y * height)
//
//         deepLevel++
//
//         let ingredients = recipeNode.getIngredientsWithConnectedNodes()
//
//         console.log(ingredients)
//         console.log(ingredients.length)
//         console.log(recipeNode.ingredients)
//         console.log(recipeNode.ingredients.length)
//         for (let i = 0; i < ingredients.length; i++) {
//             let y = pos.y + i
//             if (i > 0) {
//                 y = pos.y + i + (ingredients[i - 1].connectedRecipeNode.size - 1)
//             }
//             this.updatePositions(
//                 ingredients[i].connectedRecipeNode,
//                 new Position(pos.x + 1, y),
//                 deepLevel
//             )
//         }
//     }
// }
