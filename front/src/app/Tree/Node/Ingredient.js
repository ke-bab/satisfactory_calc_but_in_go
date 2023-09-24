import {Part} from "../../GameData/Part";

export class Ingredient {
    name
    amount
    parentRecipeNode = null
    connectedRecipeNode = null
    constructor(name, amount, parentRecipeNode) {
        this.name = name
        this.amount = amount
        this.parentRecipeNode = parentRecipeNode
    }
}