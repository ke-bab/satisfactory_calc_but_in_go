import {action, computed, makeObservable, observable} from "mobx";
import {Recipe} from "../../GameData/Recipe";
import {NodeState} from "./NodeState";
import {EventBus} from "../../Bus";
import {events as nodeEvents} from "./NodeState";

export const events = {
    recipeChanged: 'ingredient-recipe-changed'
}

export class Ingredient {
    name;
    amount;
    manufacturingDuration;

    /** @type {?Recipe}*/
    selectedRecipe = null
    /** @type {Recipe[]}*/
    recipeOptions = []
    /** @type {?NodeState}*/
    childNode = null
    /** @type {?NodeState}*/
    parentNode;

    constructor(name, amount, manufacturingDuration, node) {
        this.name = name;
        this.amount = amount;
        this.manufacturingDuration = manufacturingDuration;
        this.parentNode = node;
        makeObservable(this, {
            amount: observable,
            recipeOptions: observable,
            selectedRecipe: observable,
            childNode: observable,
            amountPerMin: computed,
            setRecipeOptions: action,
            setSelectedRecipe: action,
            setChildNode: action,
        })

        this.loadRecipeOptions()
    }

    setChildNode(node) {
        this.childNode = node
    }
    setSelectedRecipeByName(name) {
        const recipe = this.recipeOptions.find((r) => r.name === name)
        this.setSelectedRecipe(recipe === undefined ? null : recipe)
        if (this.selectedRecipe !== null) {
            this.setChildNode(new NodeState(this.selectedRecipe, this.name, this))
        } else {
            let childNode = this.childNode
            this.setChildNode(null)
            EventBus.publish(nodeEvents.removed, childNode)
        }
        this.parentNode.updateSizeRecursive()
        EventBus.publish(events.recipeChanged, this)
    }

    setSelectedRecipe(recipe) {
        this.selectedRecipe = recipe
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