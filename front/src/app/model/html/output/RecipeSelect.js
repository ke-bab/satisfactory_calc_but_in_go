// import {EventBus} from "../../../bus";
// import {Amount} from "./Amount";
//
// export class RecipeSelect {
//     /** @type {HTMLSelectElement} */
//     selector = document.querySelector('#recipe_select')
//     amount = new Amount()
//     listenChanges() {
//         this.selector.addEventListener('change', (event) => {
//             let recipe = this.selector.options[this.selector.selectedIndex].recipe
//             let amountEl = document.querySelector('#amount')
//             amountEl.style.display = 'block'
//             let wanted_input = document.querySelector('#wanted_resource_input')
//             let resource = recipe.products.find((r) => r.name === wanted_input.value, null)
//             this.amount.setAmount(60 / recipe.manufactoringDuration * resource.amount)
//             EventBus.publish('root-recipe-selected', recipe)
//         })
//     }
// }
