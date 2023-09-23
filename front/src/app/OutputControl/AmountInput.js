import {EventBus} from "../bus";
import {events as recipeSelectEvents} from "./RecipeSelect";
import {Recipe} from "../GameData/Recipe";

export const events = {
    amountChanged: 'amount-changed'
}

export class AmountInput {
    selectedPart = ''
    amountInput = document.querySelector('#amount')
    amount = 0

    constructor() {
        EventBus.subscribe(recipeSelectEvents.recipeSelected, (recipe) => {
            this.setAmountByRecipe(recipe)
        })
        this.amountInput.addEventListener('change', () => {
            this.amount = this.amountInput.value
            this.updateView()
            EventBus.publish(events.amountChanged, this.amount)
        })
    }

    updateView() {
        if (this.selectedPart === '') {
            this.amountInput.style.display = 'none'
        } else {
            this.amountInput.style.display = 'block'
        }
        this.amountInput.value = this.amount
    }

    setAmountByRecipe(recipe) {
        /** @type {?Recipe} recipe*/
        if (recipe === null) {
            this.amount = 0
        } else {
            let resource = recipe.products.find((r) => r.name === this.selectedPart, null)
            this.amount = 60 / recipe.manufactoringDuration * resource.amount
        }
        this.updateView()
        EventBus.publish(events.amountChanged, this.amount)
    }
}