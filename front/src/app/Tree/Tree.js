import {RecipeNode} from "./Node/RecipeNode";
import {EventBus} from "../bus";
import {events as recipeSelectEvents} from "../OutputControl/RecipeSelect";
import {events as partSearchEvents} from "../OutputControl/PartSearch";
import {Recipe} from "../GameData/Recipe";
import {Position} from "./Node/Position";

export class Tree {
    /** @type ?RecipeNode */
    root = null
    view = new View(this)

    constructor() {
        EventBus.subscribe(recipeSelectEvents.recipeChanged, (recipe) => this.changeRoot(recipe))
        EventBus.subscribe(partSearchEvents.partChanged, () => this.removeSubTree(this.root))
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
        if (startNode === null) {
            return
        }
        startNode.childNodes.forEach((node) => this.removeSubTree(node))
        startNode.removeHtml()
        this.view.updatePositions()
    }
}

export const width = 10
export const height = 5

class View {

    constructor(model) {
        this.model = model
    }

    update() {

    }

    updatePositions(recipeNode = this.model.root, pos = new Position(0, 0), deepLevel = 0) {
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