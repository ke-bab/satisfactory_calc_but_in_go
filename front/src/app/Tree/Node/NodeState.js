import {makeObservable, observable} from "mobx";
import {Recipe} from '../../GameData/Recipe'

export class NodeState {
    recipe
    size
    /** @type {Ingredient[]} */
    ingredients= []


    /**
     * @param {Recipe} recipe
     */
    constructor(recipe) {
        this.recipe = recipe;


    }
}

export class Ingredient {
    name = ''
    recipe = null
    /**
     * @type {?NodeState}
     */
    childNode = null
}