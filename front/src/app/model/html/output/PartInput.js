import {fillRecipeOptions} from "../Render";

export class PartInput {
    element = document.querySelector('#wanted_resource_input')
    init() {
        window.addEventListener('change', (e) => {
            // clear tree
            if (e.target.value === '') {
                return
            }
            fetch('/find-recipe-by-product?product=' + e.target.value)
                .then((response) => response.json())
                .then((json) => fillRecipeOptions(json))
                .catch(error => {
                    // clear tree
                })
        })
    }
}