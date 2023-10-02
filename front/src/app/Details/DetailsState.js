import {action, makeObservable, observable} from "mobx";
import {events as nodeEvents, NodeState} from "../Tree/Node/NodeState";
import {EventBus} from "../Bus";
import {events as recipeEvents} from "../Output/Recipe/RecipeState";
import {events as partEvents} from "../Output/Part/PartState";

export class DetailsState {
    /** @type {?NodeState}*/
    node = null
    constructor() {
        makeObservable(this, {
            node: observable,
            setNode: action,
        })
        EventBus.subscribe(nodeEvents.clicked, (node) => this.handleNodeClick(node))
        EventBus.subscribe(recipeEvents.recipeChanged, (node) => this.handleOutputChanged())
        EventBus.subscribe(partEvents.partChanged, (node) => this.handleOutputChanged())
    }

    setNode(node) {
        this.node = node
    }

    /**
     * @param {NodeState} node
     */
    handleNodeClick(node) {
        this.setNode(node)
    }

    handleOutputChanged() {
        this.setNode(null)
    }
}