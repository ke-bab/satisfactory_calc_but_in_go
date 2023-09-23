import {RecipeNode} from "./Node/RecipeNode";
import {EventBus} from "../bus";
import {events as recipeSelectEvents} from "../OutputControl/RecipeSelect";
import {Recipe} from "../GameData/Recipe";
import {Position} from "../model/html/Render";

export class Tree {
    /** @type ?RecipeNode */
    root = null

    constructor() {
        EventBus.subscribe(recipeSelectEvents.recipeChanged, (recipe) => {
            /** @type {?Recipe} recipe */
            this.changeRoot(recipe)
        })
    }

    /**
     * @param {Recipe} recipe
     */
    changeRoot(recipe) {
        if (this.root !== null) {
            this.removeSubTree(this.root)
        }
        this.root = new RecipeNode(recipe)
    }


    /**
     * @param {RecipeNode} startNode
     */
    removeSubTree(startNode) {
        startNode.childNodes.forEach((node) => this.removeSubTree(node))
        startNode.removeHtml()
        this.updatePositions()
    }

    updatePositions(recipeNode = this.root, pos = new Position(0, 0), deepLevel = 0) {
        if (recipeNode === null) {
            return
        }
        recipeNode.cell.style.left = pos.x * width + (deepLevel) + "em"
        recipeNode.cell.style.top = pos.y * height + "em"
        deepLevel++
        for (let i = 0; i < recipeNode.childNodes.length; i++) {
            let y = pos.y + i
            if (i > 0) {
                y = pos.y + i + (recipeNode.childNodes[i - 1].size - 1)
            }
            this.updatePositions(
                recipeNode.childNodes[i],
                new Position(pos.x + 1, y),
                deepLevel
            )
        }
    }
}

export const width = 10
export const height = 5
