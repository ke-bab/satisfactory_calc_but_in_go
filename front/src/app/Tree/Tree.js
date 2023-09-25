import {RecipeNode} from "./Node/RecipeNode";
import {EventBus} from "../bus";
import {events as recipeSelectEvents} from "../OutputControl/RecipeSelect";
import {events as partSearchEvents} from "../OutputControl/PartSearch";
import {Position} from "./Node/Position";
import {events as nodeEvents} from "./Node/RecipeNode";
import {Recipe} from "../GameData/Recipe";

export class Tree {
    /** @type ?RecipeNode */
    root = null
    view = new View(this)

    constructor() {
        EventBus.subscribe(recipeSelectEvents.recipeChanged, (recipe) => this.handleRecipeChanged(recipe))
        EventBus.subscribe(partSearchEvents.partChanged, () => this.handlePartSearchChanged())
        EventBus.subscribe(nodeEvents.nodeDropped, () => this.handleNodeDropped())
        EventBus.subscribe(nodeEvents.nodeCreated, () => this.handleNodeCreated())
    }

    handleNodeDropped() {
        this.view.updatePositions()
    }
    handleNodeCreated() {
        this.view.updatePositions()
    }

    handlePartSearchChanged() {
        if (this.root instanceof RecipeNode) {
            this.root.drop()
        }
    }

    handleRecipeChanged(recipe) {
        if (this.root instanceof RecipeNode) {
            this.root.drop()
            this.setRoot(null)
        }
        console.log(recipe)
        console.log(recipe instanceof Recipe)
        if (recipe instanceof Recipe) {
            this.setRoot(new RecipeNode(recipe))
        }
    }

    /**
     * @param {?RecipeNode} recipeNode
     */
    setRoot(recipeNode) {
        this.root = recipeNode
    }
}

export const width = 10
export const height = 5

class View {

    constructor(model) {
        this.model = model
    }

    /**
     *
     * @param {?RecipeNode} recipeNode
     * @param {Position} pos
     * @param {number} deepLevel
     */
    updatePositions(recipeNode = this.model.root, pos = new Position(0, 0), deepLevel = 0) {
        if (recipeNode === null) {
            return
        }

        recipeNode.setPos(pos.x * width + (deepLevel), pos.y * height)

        deepLevel++
        let ingredients = recipeNode.getIngredientsWithConnectedNodes()
        for (let i = 0; i < ingredients.length; i++) {
            let y = pos.y + i
            if (i > 0) {
                y = pos.y + i + (ingredients[i - 1].connectedRecipeNode.size - 1)
            }
            this.updatePositions(
                ingredients[i].connectedRecipeNode,
                new Position(pos.x + 1, y),
                deepLevel
            )
        }
    }
}