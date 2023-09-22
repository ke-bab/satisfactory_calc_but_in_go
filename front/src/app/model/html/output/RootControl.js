import {PartInput} from "./PartInput";
import {RecipeSelect} from "./RecipeSelect";
import {Amount} from "./Amount";

export class RootControl {
    element = document.querySelector('#root-control')
    partInput = new PartInput()
    recipeSelect = new RecipeSelect()

    init() {
        this.partInput.init()
        this.recipeSelect.listenChanges()
        window.addEventListener('load', () => {
            fetch("/resource-name-list")
                .then((response) => response.json())
                .then((json) => {
                    fillResourceNames(json)
                })
                .catch(() => {
                })
        })
    }
}

/**
 * @param {Option[]} list
 */
function fillResourceNames(list) {
    let datalist = document.querySelector('#wanted_resource_list')
    for (let i = 0; i < list.length; i++) {
        let newOption = document.createElement("option")
        newOption.value = list[i].name
        newOption.innerHTML = list[i].displayName
        datalist.appendChild(newOption)
    }
}
