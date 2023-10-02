import {computed, makeObservable, observable} from "mobx";
import {Recipe} from '../../GameData/Recipe'

export class NodeState {
    recipe
    size
    /** @type {Ingredient[]} */
    ingredients= []


    /**
     * @param {Recipe} recipe
     */
    constructor(recipe) {
        this.recipe = recipe;
        this.ingredients = recipe.ingredients.map(
            (i) => new Ingredient(i.name, i.amount, recipe.manufactoringDuration)
        )
    }
}

export class Ingredient {
    name;
    amount;
    manufacturingDuration;

    selectedRecipe = null
    /**
     * @type {?NodeState}
     */
    childNode = null

    constructor(name, amount, manufacturingDuration) {
        this.name = name;
        this.amount = amount;
        this.manufacturingDuration = manufacturingDuration;
        makeObservable(this, {
            amount: observable,
            amountPerMin: computed,
        })
    }

    get amountPerMin() {
        return 60 / this.manufacturingDuration * this.amount
    }
}