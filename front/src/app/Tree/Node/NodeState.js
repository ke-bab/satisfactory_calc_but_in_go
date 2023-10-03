import {Recipe} from '../../GameData/Recipe'
import {EventBus} from "../../Bus";
import {Part} from '../../GameData/Part'
import {Ingredient} from "./Ingredient";
import {Position} from "./Position";
import {action, makeObservable, observable} from "mobx";

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
     * @param {number} amountPerMinTarget
     */
    constructor(recipe, part, parentIngredient = null, amountPerMinTarget = 1) {
        makeObservable(this, {
            multiplier: observable,
            setMultiplier: action,
        })

        this.recipe = recipe;
        this.parentIngredient = parentIngredient;
        this.mainProduct = this.recipe.findProduct(part)
        this.ingredients = recipe.ingredients.map(
            (i) => new Ingredient(i, this)
        )
        this.setMultiplier(amountPerMinTarget / this.amountPerMin)
    }

    updateMultiplierRecursive(amountPerMinTarget) {
        this.setMultiplier(amountPerMinTarget / this.amountPerMin)
        this.getConnectedRecipes().forEach((node) => node.updateMultiplierRecursive(node.parentIngredient.amountPerMinX))
    }

    setMultiplier(m) {
        this.multiplier = m
    }

    get amountPerMin() {
        return 60 / this.recipe.manufactoringDuration * this.mainProduct.amount
    }

    get amountPerMinX() {
        return this.amountPerMin * this.multiplier
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

    getConnectedRecipes() {
        return this.ingredients
            .filter((i) => i.childNode !== null)
            .map((i) => i.childNode)
    }
}
