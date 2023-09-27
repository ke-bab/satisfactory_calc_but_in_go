import {Part} from "../../GameData/Part";
import {RecipeNode} from "./RecipeNode";
import {Recipe} from "../../GameData/Recipe";
import {EventBus} from "../../Bus";

export const events = {
    connectedNodeChanged: 'connected-node-changed'
}

export class Ingredient {
    name
    amount
    /** @type {RecipeNode}*/
    parentRecipeNode = null
    /** @type {?RecipeNode}*/
    connectedRecipeNode = null
    constructor(name, amount, parentRecipeNode) {
        this.name = name
        this.amount = amount
        this.parentRecipeNode = parentRecipeNode
    }

    /**
     * @param {?Recipe} recipe
     */
    setConnectedRecipeNode(recipe) {
        if (this.connectedRecipeNode !== null) {
            this.connectedRecipeNode.drop(false)
        }
        if (recipe !== null) {
            this.connectedRecipeNode = new RecipeNode(recipe)
        }
        EventBus.publish(events.connectedNodeChanged)
    }
}