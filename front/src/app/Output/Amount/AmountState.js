import {action, makeObservable, observable} from "mobx";

export class AmountState {
    amount = 0
    _part = ''


    constructor() {
        makeObservable(this, {
            amount: observable,
            setAmount: action,
        })
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