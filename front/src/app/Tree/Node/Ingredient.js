import {action, computed, makeObservable, observable} from "mobx";
import {Recipe} from "../../GameData/Recipe";
import {NodeState} from "./NodeState";
import {EventBus} from "../../Bus";
import {Part} from "../../GameData/Part";

export const events = {
    recipeChanged: 'ingredient-recipe-changed',
    nodeAdded: 'ingredient-node-added',
    nodeRemoved: 'ingredient-node-removed',
}

export class Ingredient {
    /** @type {Part}*/
    part
    /** @type {?Recipe}*/
    selectedRecipe = null
    /** @type {Recipe[]}*/
    recipeOptions = []
    /** @type {?NodeState}*/
    childNode = null
    /** @type {?NodeState}*/
    parentNode;

    constructor(part, node) {
        this.part = part
        this.parentNode = node;
        makeObservable(this, {
            recipeOptions: observable,
            setRecipeOptions: action,
            //
            selectedRecipe: observable,
            setSelectedRecipe: action,
            //
            childNode: observable,
            setChildNode: action,
            //
            amountPerMin: computed,
            amountPerMinX: computed,
        })
        this.loadRecipeOptions()
    }

    get amountPerMin() {
        return 60 / this.parentNode.recipe.manufactoringDuration * this.part.amount
    }

    get amountPerMinX() {
        return this.amountPerMin * this.parentNode.multiplier
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
            let newNode = new NodeState(this.selectedRecipe, this.part.name, this, this.amountPerMinX)
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
        fetch('/find-recipe-by-product?product=' + this.part.name)
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