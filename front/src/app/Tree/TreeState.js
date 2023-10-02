import {action, makeObservable, observable} from "mobx";
import {Recipe} from '../GameData/Recipe'
import {NodeState} from './Node/NodeState'
import {EventBus} from "../Bus";
import {events as recipeEvents} from "../Output/Recipe/RecipeState";
import {events as partEvents} from "../Output/Part/PartState";

export class TreeState {
    /**
     * @type {?NodeState}
     */
    rootNode = null
    _part = ''

    constructor() {
        makeObservable(this, {
            rootNode: observable,
            setRootNode: action,
        })
        EventBus.subscribe(recipeEvents.recipeChanged, (recipe)=> this.handleRecipeChanged(recipe))
        EventBus.subscribe(partEvents.partChanged, (part)=> this.handlePartChanged(part))
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
        if (recipe === null) {
            this.setRootNode(null)
        } else {
            this.setRootNode(new NodeState(recipe, this._part))
        }
    }

    handlePartChanged(part) {
        this._part = part
    }
}