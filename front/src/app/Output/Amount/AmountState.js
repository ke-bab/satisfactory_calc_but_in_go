import {action, makeObservable, observable} from "mobx";
import {EventBus} from "../../Bus";
import {events as partSearchEvents} from "../Part/PartState";
import {events as recipeSelectEvents} from "../Recipe/RecipeState";

export class AmountState {
    amount = 0
    _part = ''


    constructor() {
        makeObservable(this, {
            amount: observable,
            setAmount: action,
        })
        EventBus.subscribe(partSearchEvents.partChanged, (part) => this.handlePartChanged(part))
        EventBus.subscribe(recipeSelectEvents.recipeChanged, (recipe) => this.handleRecipeChanged(recipe))
    }

    setAmount(amount) {
        this.amount = amount;
    }

    handlePartChanged(part) {
        this._part = part
        this.setAmount(0)
    }

    handleRecipeChanged(recipe) {
        if (recipe === '') {
            this.setAmount(0)
        } else {
            let part = recipe.products.find((part) => part.name === this._part)
            if (part !== undefined) {
                this.setAmount(60 / recipe.manufactoringDuration * part.amount)
            } else {
                this.setAmount(0)
            }
        }
    }

}