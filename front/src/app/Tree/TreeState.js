import {action, makeObservable, observable} from "mobx";
import {Recipe} from '../GameData/Recipe'
import {NodeState} from './Node/NodeState'
import {EventBus} from "../Bus";
import {events as recipeEvents} from "../Output/Recipe/RecipeState";
import {events as partEvents} from "../Output/Part/PartState";
import {events as ingredientEvents} from "../Tree/Node/Ingredient";
import {events as nodeEvents} from "../Tree/Node/NodeState";
import {events as amountEvents} from "../Output/Amount/AmountState";
import {Position} from "./Node/Position";
import {defaultAmount} from "../Output/Amount/AmountState";

export  const width = 10
export const height = 5

export const events = {
    nodeAdded: 'root-node-added',
    nodeRemoved: 'root- node-removed',
}

export class TreeState {
    /**
     * @type {?NodeState}
     */
    rootNode = null
    _part = ''
    _amount = defaultAmount

    constructor() {
        makeObservable(this, {
            rootNode: observable,
            setRootNode: action,
        })
        EventBus.subscribe(recipeEvents.recipeChanged, (recipe)=> this.handleRecipeChanged(recipe))
        EventBus.subscribe(partEvents.partChanged, (part)=> this.handlePartChanged(part))
        EventBus.subscribe(ingredientEvents.recipeChanged, ()=> this.handleIngredientRecipeChanged())
        EventBus.subscribe(amountEvents.changed, (amount) => this.handleAmountChanged(amount))
    }

    handleAmountChanged(amount) {
        this._amount = amount
        if (amount <= 0) {
            amount = 0
        }

        if (this.rootNode !== null) {
            this.rootNode.updateMultiplierRecursive(amount)
        }
    }

    handleIngredientRecipeChanged() {
        this.updatePositions()
    }

    setRootNode(node) {
        let oldNode = this.rootNode
        this.rootNode = node
        if (oldNode !== null) {
            EventBus.publish(events.nodeRemoved, oldNode)
        }
        if (node !== null) {
            EventBus.publish(events.nodeAdded, node)
        }
    }

    /**
     * @return {NodeState[]}
     */
    getAllNodesAsList() {
        const list = []
        this.putNodesToListRecursive(this.rootNode, list)

        return list
    }

    /**
     * @param {NodeState} startNode
     * @param {NodeState[]} list
     */
    putNodesToListRecursive(startNode, list) {
        if (startNode !== null) {
            list.push(startNode)
            startNode.ingredients.map((i) => this.putNodesToListRecursive(i.childNode, list))
        }
    }

    /**
     * @param {?Recipe} recipe
     */
    handleRecipeChanged(recipe) {
        if (recipe === null) {
            this.setRootNode(null)
        } else {
            this.setRootNode(new NodeState(recipe, this._part, null, this._amount))
        }
    }

    handlePartChanged(part) {
        this._part = part
    }

    updatePositions(recipeNode = this.rootNode, pos = new Position(0, 0), deepLevel = 0) {
        if (recipeNode === null) {
            return
        }

        recipeNode.pos = new Position(pos.x * width + (deepLevel), pos.y * height)

        deepLevel++

        let ingredients = recipeNode.getIngredientsWithConnectedNodes()
        for (let i = 0; i < ingredients.length; i++) {
            let y = pos.y + i
            if (i > 0) {
                y = pos.y + i + (ingredients[i - 1].childNode.size - 1)
            }
            this.updatePositions(
                ingredients[i].childNode,
                new Position(pos.x + 1, y),
                deepLevel
            )
        }
    }
}