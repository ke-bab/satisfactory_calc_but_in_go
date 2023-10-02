import {action, makeObservable, observable} from "mobx";
import {NodeState} from "../Tree/Node/NodeState";

export class DetailsState {
    /** @type {?NodeState}*/
    node = null
    constructor() {
        makeObservable(this, {
            node: observable,
            setNode: action,
        })
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