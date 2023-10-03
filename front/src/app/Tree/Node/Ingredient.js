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
    amountPerMin
    amountPerMinMulti

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
            amountPerMin: observable,
            amountPerMinMulti: observable,
            setAmountPerMin: action,
            setAmountPerMinMulti: action,
            recipeOptions: observable,
            selectedRecipe: observable,
            childNode: observable,
            setRecipeOptions: action,
            setSelectedRecipe: action,
            setChildNode: action,
        })
        this.updateAmounts()
        this.loadRecipeOptions()
    }

    setAmountPerMin(amount) {
        this.amountPerMin = amount
    }

    setAmountPerMinMulti(amount) {
        this.amountPerMinMulti = amount
    }

    updateAmounts() {
        this.setAmountPerMin(60 / this.manufacturingDuration * this.amount)
        this.setAmountPerMinMulti(60 / this.manufacturingDuration * this.amount * this.parentNode.multiplier)
        console.log(this.name)
        console.log(this.amountPerMinMulti)
        console.log(this.parentNode.multiplier)
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
            let newNode = new NodeState(this.selectedRecipe,this.name,this,this.amountPerMinMulti)
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