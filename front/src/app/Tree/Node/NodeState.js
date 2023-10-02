import {action, computed, makeObservable, observable} from "mobx";
import {Recipe} from '../../GameData/Recipe'
import {EventBus} from "../../Bus";
import {Part} from '../../GameData/Part'
import {Ingredient} from "./Ingredient";

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

    /**
     * @param {Recipe} recipe
     * @param {string} part
     */
    constructor(recipe, part) {
        this.recipe = recipe;
        this.mainProduct = this.recipe.findProduct(part)
        this.ingredients = recipe.ingredients.map(
            (i) => new Ingredient(i.name, i.amount, recipe.manufactoringDuration, this)
        )
    }

    updateSizeRecursive() {

    }

    handleClick(e) {
        EventBus.publish(events.clicked, this)
    }

    getAmountPerMin() {
        return 60 / this.recipe.manufactoringDuration * this.mainProduct.amount
    }
}
