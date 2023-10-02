import {action, computed, makeObservable, observable} from "mobx";
import {Recipe} from '../../GameData/Recipe'
import {EventBus} from "../../Bus";
import {Part} from '../../GameData/Part'

export const events = {
    clicked: 'node-clicked'
}

export class NodeState {
    recipe
    size = 0
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
            (i) => new Ingredient(i.name, i.amount, recipe.manufactoringDuration)
        )
    }

    handleClick(e) {
        EventBus.publish(events.clicked, this)
    }

    getAmountPerMin() {
        return 60 / this.recipe.manufactoringDuration * this.mainProduct.amount
    }
}

export class Ingredient {
    name;
    amount;
    manufacturingDuration;

    selectedRecipe = null
    /** @type {Recipe[]}*/
    recipeOptions = []
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
            recipeOptions: observable,
            amountPerMin: computed,
            setRecipeOptions: action,
        })

        this.loadRecipeOptions()
    }

    setRecipeOptions(options) {
        this.recipeOptions = options
    }

    get amountPerMin() {
        return 60 / this.manufacturingDuration * this.amount
    }

    loadRecipeOptions() {
        fetch('/find-recipe-by-product?product=' + this.name)
            .then((response) => response.json())
            .then((recipeList) => {
                /** @type {Recipe[]} recipeList*/
                this.recipeOptions = recipeList.map(this.makeRecipe)
            })
            .catch(error => {
                this.setRecipeOptions([])
            })
    }

    makeRecipe(recipeObject) {
        const newRecipe = new Recipe()
        newRecipe.name = recipeObject.name
        newRecipe.displayName = recipeObject.displayName
        newRecipe.ingredients = recipeObject.ingredients
        newRecipe.products = recipeObject.products
        newRecipe.manufactoringDuration = recipeObject.manufactoringDuration
        newRecipe.producedIn = recipeObject.producedIn

        return newRecipe
    }
}