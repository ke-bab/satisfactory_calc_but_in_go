import {EventBus} from "../Bus";
import {events as recipeSelectEvents} from "./RecipeSelect";
import {events as partSearchEvents} from "./PartSearch";
import {Recipe} from "../GameData/Recipe";
import {PartSearch} from "./PartSearch";
import {Part} from "../GameData/Part";

export const events = {
    amountChanged: 'amount-changed'
}

export class AmountInput {
    /** @type {?PartSearch} */
    partSearch = null
    amount = 0
    view = new View(this)

    constructor() {
        EventBus.subscribe(recipeSelectEvents.recipeChanged, (recipe) => this.handleRecipeChanged(recipe))
        EventBus.subscribe(partSearchEvents.partChanged, () => this.handlePartChanged())
    }

    handlePartChanged() {
        this.view.hide()
        this.setAmount(0)
    }

    setAmount(amount) {
        this.amount = amount
        this.view.update()
        EventBus.publish(events.amountChanged, this.amount)
    }

    /**
     * @param {?Recipe} recipe
     */
    handleRecipeChanged(recipe) {
        if (recipe === null) {
            this.view.hide()
            this.setAmount(0)
        } else {
            let part = this.findWantedPartByRecipe(recipe)
            this.setAmount(60 / recipe.manufactoringDuration * part.amount)
            this.view.show()
        }
    }

    /**
     * @param {Recipe} recipe
     * @return {?Part}
     */
    findWantedPartByRecipe(recipe) {
        return recipe.products.find((part) => part.name === this.partSearch.search, null)
    }
}

class View {
    amountBlock = document.querySelector('#amount')
    amountInput = document.querySelector('#amount_input')

    constructor(model) {
        this.hide()
        this.model = model
        this.amountInput.addEventListener('change', () => {
            this.model.setAmount(this.amountInput.value)
        })
    }

    update() {
        this.amountInput.value = this.model.amount
    }

    hide() {
        this.amountBlock.classList.remove('shown')
        this.amountBlock.classList.add('hidden')
    }

    show() {
        this.amountBlock.classList.remove('hidden')
        this.amountBlock.classList.add('shown')
    }
}