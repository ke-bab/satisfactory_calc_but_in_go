import {action, makeObservable, observable} from "mobx";
import {EventBus} from "../Bus";
import {Recipe} from '../GameData/Recipe'
import {events as recipeEvents} from "../Output/Recipe/RecipeState";
import {NodeState} from './Node/NodeState'

export class TreeState {
    /**
     * @type {?NodeState}
     */
    rootNode = null

    constructor() {
        makeObservable(this, {
            rootNode: observable,
            setRootNode: action,
        })

        EventBus.subscribe(recipeEvents.recipeChanged, (recipe)=> this.handleRecipeChanged(recipe))
    }

    setRootNode(node) {
        this.rootNode = node
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
        console.log("tree handleRecipeChanged")
        if (recipe === null) {
            this.setRootNode(null)
        } else {
            this.setRootNode(new NodeState(recipe))
        }
    }
}