import {Ingredient} from "../Tree/Node/Ingredient";
import {action, computed, makeObservable, observable} from "mobx";
import {EventBus} from "../Bus";
import {events as treeEvents} from "../Tree/TreeState";
import {events as ingredientEvents} from "../Tree/Node/Ingredient";
import {NodeState} from "../Tree/Node/NodeState";
import './total.css'

export class TotalState {
    /** @type {Ingredient[]}*/
    ingredients = []
    constructor() {
        makeObservable(this, {
            ingredients: observable,
            listTotals: computed,
            pushIngredient: action,
            dropIngredient: action,
        })
        EventBus.subscribe(treeEvents.nodeAdded, (node) => this.handleNodeCreated(node))
        EventBus.subscribe(treeEvents.nodeRemoved, (node) => this.handleNodeRemoved(node))
        EventBus.subscribe(ingredientEvents.nodeAdded, (node) => this.handleNodeCreated(node))
        EventBus.subscribe(ingredientEvents.nodeRemoved, (node) => this.handleNodeRemoved(node))
    }

    /**
     * @param {NodeState} node
     */
    handleNodeCreated(node) {
        if (node.parentIngredient !== null) {
            this.dropIngredient(node.parentIngredient)
        }
        node.ingredients.forEach((i) => this.pushIngredient(i))
    }

    /**
     * @param {NodeState} node
     */
    handleNodeRemoved(node) {
        node.ingredients.forEach((i) => this.dropIngredient(i))
        if (node.parentIngredient !== null) {
            this.pushIngredient(node.parentIngredient)
        }
    }

    /** @param {Ingredient} i*/
    pushIngredient(i) {
        this.ingredients.push(i)
    }

    /** @param {Ingredient} i*/
    dropIngredient(i) {
        for (let j = 0; j < this.ingredients.length; j++) {
            if (this.ingredients[j] === i) {
                this.ingredients.splice(j, 1)
            }
        }
    }


    /**
     * @return {Object.<string, number>}
     */
    get listTotals() {
        let list = {}
        this.ingredients.forEach((i) => {
            if (list[i.part.name] === undefined) {
                list[i.part.name] = i.amountPerMinX
            } else {
                list[i.part.name] += i.amountPerMinX
            }
        })

        return list
    }
}