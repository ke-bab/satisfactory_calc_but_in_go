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
    amountPerMin = 0
    amountPerMinMulti = 0
    /**
     * @param {Recipe} recipe
     * @param {string} part
     * @param {?Ingredient} parentIngredient
     * @param {number} amountPerMinTarget
     */
    constructor(recipe, part, parentIngredient = null, amountPerMinTarget) {
        makeObservable(this, {
            multiplier: observable,
            setMultiplier: action,
            amountPerMin: observable,
            amountPerMinMulti: observable,
            setAmountPerMinMulti: action,
        })

        this.recipe = recipe;
        this.parentIngredient = parentIngredient;
        this.mainProduct = this.recipe.findProduct(part)
        this.ingredients = recipe.ingredients.map(
            (i) => new Ingredient(i.name, i.amount, recipe.manufactoringDuration, this)
        )
        this.amountPerMin = 60 / this.recipe.manufactoringDuration * this.mainProduct.amount
        this.amountPerMinMulti = 60 / this.recipe.manufactoringDuration * this.mainProduct.amount * this.multiplier
        this.updateMultiplierRecursive(amountPerMinTarget)
    }

    setAmountPerMinMulti(amount) {
        this.amountPerMinMulti = amount
    }

    updateAmounts() {
        this.setAmountPerMinMulti(60 / this.recipe.manufactoringDuration * this.mainProduct.amount * this.multiplier)

    }

    updateMultiplierRecursive(amountPerMinTarget) {
        this.setMultiplier(amountPerMinTarget / this.amountPerMin)
        this.updateAmounts()
        this.ingredients.forEach((i) => {
            i.updateAmounts()
        })
        this.getIngredientsWithConnectedNodes().forEach((i) => {
            console.log("i.childNode.updateMultiplierRecursive(i.amountPerMinMulti)")
            i.childNode.updateMultiplierRecursive(i.amountPerMinMulti)
        })

    }

    setMultiplier(m) {
        this.multiplier = m
    }

    handleClick(e) {
        EventBus.publish(events.clicked, this)
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
