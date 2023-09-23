import {EventBus} from "../bus";
import {Recipe} from "./Recipe";

export const partSelected = 'part-selected'
export const partClear = 'part-clear'

export class PartSearch {
    search = ''
    searchInput = document.querySelector('#parts_input')

    constructor() {
        this.registerOnChange()
    }

    registerOnChange() {
        this.searchInput.addEventListener('change', (event) => {
            this.search = this.searchInput.value
            if (this.search === '') {
                EventBus.publish(partClear)
            } else {
                fetch('/find-recipe-by-product?product=' + this.search)
                    .then((response) => response.json())
                    .then((recipeList) => {
                        /** @type {Recipe[]} recipeList*/
                        EventBus.publish(partSelected, recipeList)
                    })
                    .catch(error => EventBus.publish(partClear))
            }
        })
    }
}