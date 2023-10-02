import {Recipe} from '../../GameData/Recipe'
import {EventBus} from "../../Bus";
import {Part} from '../../GameData/Part'
import {Ingredient} from "./Ingredient";
import {Position} from "./Position";

export const events = {
    clicked: 'node-clicked'
}

export class NodeState {
    recipe
    size = 1
    /** @type {Ingredient[]} */
    ingredients = []
    /** @type {Part}*/
    mainProduct
    /** @type {?Ingredient} */
    parentIngredient;
    pos = new Position()

    /**
     * @param {Recipe} recipe
     * @param {string} part
     * @param {?Ingredient} parentIngredient
     */
    constructor(recipe, part, parentIngredient = null) {
        this.recipe = recipe;
        this.parentIngredient = parentIngredient;
        this.mainProduct = this.recipe.findProduct(part)
        this.ingredients = recipe.ingredients.map(
            (i) => new Ingredient(i.name, i.amount, recipe.manufactoringDuration, this)
        )
    }

    handleClick(e) {
        EventBus.publish(events.clicked, this)
    }

    getAmountPerMin() {
        return 60 / this.recipe.manufactoringDuration * this.mainProduct.amount
    }

    updateSizeRecursive() {
        let ingredientsWithConnectedNodes = this.getIngredientsWithConnectedNodes()
        let newSize = 0
        ingredientsWithConnectedNodes.forEach((i) => {
            newSize += i.childNode.size
        })
        if (newSize === 0) {
            newSize++
        }
        this.size = newSize


        if (this.parentIngredient !== null) {
            this.parentIngredient.parentNode.updateSizeRecursive()
        }
    }

    getIngredientsWithConnectedNodes() {
        return this.ingredients.filter((i) => i.childNode !== null)
    }
}
