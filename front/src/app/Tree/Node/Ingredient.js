import {action, computed, makeObservable, observable} from "mobx";
import {Recipe} from "../../GameData/Recipe";
import {NodeState} from "./NodeState";
import {EventBus} from "../../Bus";
import {events as nodeEvents} from "./NodeState";

export const events = {
    recipeChanged: 'ingredient-recipe-changed',
    nodeAdded: 'ingredient-node-added',
    nodeRemoved: 'ingredient-node-removed',
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
            amountPerMinM: computed,
            setRecipeOptions: action,
            setSelectedRecipe: action,
            setChildNode: action,
        })

        this.loadRecipeOptions()
    }

    setChildNode(node) {
        let oldNode = this.childNode
        this.childNode = node
        if (oldNode !== null) {
            EventBus.publish(events.nodeRemoved, oldNode)
        }
        if (node !== null) {
            EventBus.publish(events.nodeAdded, node)
        }
    }

    setSelectedRecipeByName(name) {
        const recipe = this.recipeOptions.find((r) => r.name === name)
        this.setSelectedRecipe(recipe === undefined ? null : recipe)
        if (this.selectedRecipe !== null) {
            let newNode = new NodeState(this.selectedRecipe,this.name,this,this.getAmountPerMinM())
            this.setChildNode(newNode)
        } else {
            this.setChildNode(null)
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

    getAmountPerMin() {
        return 60 / this.manufacturingDuration * this.amount

    }

    getAmountPerMinM() {
        return 60 / this.manufacturingDuration * this.amount * this.parentNode.multiplier
    }

    get amountPerMin() {
        return this.getAmountPerMin()
    }

    get amountPerMinM() {
        return this.getAmountPerMinM()
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