import {RecipeNode} from "./RecipeNode";

export class Tree {
    /** @type ?RecipeNode */
    root = null

    /**
     * @param {Recipe} recipe
     */
    changeRoot(recipe) {
        if (this.root !== null) {
            this.removeSubTree(this.root)
        }
        this.root = new RecipeNode(recipe)
    }


    /**
     * @param {RecipeNode} startNode
     */
    removeSubTree(startNode) {
        startNode.childNodes.forEach((node) => this.removeSubTree(node))
        startNode.removeHtml()
    }
}

export const width = 10
export const height = 5
