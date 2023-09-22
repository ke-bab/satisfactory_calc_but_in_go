export class RecipeSelect {
    /** @type {HTMLSelectElement} */
    selector = document.querySelector('#recipe_select')
    /** @type {?Amount} */
    amount = null
    init() {
        this.selector.addEventListener('change', (event) => {
            let recipe = this.selector.options[this.selector.selectedIndex].recipe
            let amountEl = document.querySelector('#amount')
            amountEl.style.display = 'block'
            // add img src
            let amount_input = document.querySelector("#amount_input")
            let wanted_input = document.querySelector('#wanted_resource_input')
            let resource = recipe.products.find((r) => r.name === wanted_input.value, null)
            this.amount.setAmount(60 / recipe.manufactoringDuration * resource.amount)
        })
    }
}
