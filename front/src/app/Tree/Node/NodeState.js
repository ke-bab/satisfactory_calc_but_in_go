import {Recipe} from '../../GameData/Recipe'
import {EventBus} from "../../Bus";
import {Part} from '../../GameData/Part'
import {Ingredient} from "./Ingredient";
import {Position} from "./Position";
import {action, computed, makeObservable, observable} from "mobx";

export const events = {
    clicked: 'node-clicked',
}

export class NodeState {
    /** @type {Recipe}*/
    recipe
    size = 1
    /** @type {Ingredient[]} */
    ingredients = []
    /** @type {Part}*/
    mainProduct
    /** @type {?Ingredient} */
    parentIngredient;
    pos = new Position()
    multiplier = 1
    /**
     * @param {Recipe} recipe
     * @param {string} part
     * @param {?Ingredient} parentIngredient
     * @param {number} multiplier
     */
    constructor(recipe, part, parentIngredient = null, amountPerMin) {
        makeObservable(this, {
            multiplier: observable,
            setMultiplier: action,
            amountPerMin: computed,
            amountPerMinM: computed,
        })

        this.recipe = recipe;
        this.parentIngredient = parentIngredient;
        this.mainProduct = this.recipe.findProduct(part)
        this.ingredients = recipe.ingredients.map(
            (i) => new Ingredient(i.name, i.amount, recipe.manufactoringDuration, this)
        )
        this.updateMultiplierRecursive(amountPerMin)
    }

    updateMultiplierRecursive(requirementPerMin) {
        this.setMultiplier(requirementPerMin / this.getAmountPerMinM())

        this.ingredients.forEach()

        this.getIngredientsWithConnectedNodes().forEach((i) => {
            console.log("this.getIngredientsWithConnectedNodes().forEach")
            console.log(i.getAmountPerMinM())
            i.childNode.updateMultiplierRecursive(i.getAmountPerMinM())
        })
    }

    setMultiplier(m) {
        this.multiplier = m

    }

    handleClick(e) {
        EventBus.publish(events.clicked, this)
    }

    getAmountPerMin() {
        return 60 / this.recipe.manufactoringDuration * this.mainProduct.amount
    }

    get amountPerMin() {
        return this.getAmountPerMin()
    }

    getAmountPerMinM() {
        return 60 / this.recipe.manufactoringDuration * this.mainProduct.amount * this.multiplier
    }

    get amountPerMinM() {
        return this.getAmountPerMinM()
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

    static new() {

    }

    static drop() {

    }
}
