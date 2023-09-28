import {useEffect, useState} from "react";
import {EventBus} from "../Bus";
import {events as partSearchEvents} from "./PartSearch";
import {events as recipeSelectEvents} from "./RecipeSelect";

export const events = {
    amountChanged: 'amount-changed'
}
//
// export class AmountInput {
//
//     //
//     // constructor() {
//     //     EventBus.subscribe(recipeSelectEvents.recipeChanged, (recipe) => this.handleRecipeChanged(recipe))
//     //     EventBus.subscribe(partSearchEvents.partChanged, () => this.handlePartChanged())
//     // }
//     //
//     // handlePartChanged() {
//     //     this.view.hide()
//     //     this.setAmount(0)
//     // }
//     //
//     //
//     // /**
//     //  * @param {?Recipe} recipe
//     //  */
//     // handleRecipeChanged(recipe) {
//     //     if (recipe === null) {
//     //         this.view.hide()
//     //         this.setAmount(0)
//     //     } else {
//     //         let part = this.findWantedPartByRecipe(recipe)
//     //         this.setAmount(60 / recipe.manufactoringDuration * part.amount)
//     //         this.view.show()
//     //     }
//     // }
//     //
//     // /**
//     //  * @param {Recipe} recipe
//     //  * @return {?Part}
//     //  */
//     // findWantedPartByRecipe(recipe) {
//     //     return recipe.products.find((part) => part.name === this.partSearch.search, null)
//     // }
// }

export function AmountInput() {
    const [show, setShow] = useState(false)
    const [amount, setAmount] = useState(0)
    const [searchPart, setSearchPart] = useState('')

    EventBus.subscribe(partSearchEvents.partChanged, (part) => handlePartChanged(part))
    EventBus.subscribe(recipeSelectEvents.recipeChanged, (recipe) => handleRecipeChanged(recipe))

    function handlePartChanged(part) {
        setShow(false)
        setSearchPart(part)
        setAmount(0)
    }

    function handleRecipeChanged(recipe) {
        if (recipe === undefined) {
            setShow(false)
            setAmount(0)
        } else {
            let part = recipe.products.find((part) => part.name === searchPart)
            if (part !== undefined) {
                setAmount(60 / recipe.manufactoringDuration * part.amount)
                setShow(true)
            } else {
                setShow(false)
                setAmount(0)
            }
        }
    }

    function handleChange(event) {

    }

    if (show) {
        return (
            <div id="amount">
                <img id="amount_img" src="/static/images/Assembler.png"/>
                <input id="amount_input" type="number" min="0" value={amount} onChange={handleChange}/>
            </div>
        )
    } else {
        return null
    }
}
