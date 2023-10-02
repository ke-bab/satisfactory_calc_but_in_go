import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {AmountState} from "./AmountState";
import {EventBus} from "../../Bus";
import {events as partSearchEvents} from "../Part/PartState";
import {events as recipeSelectEvents} from "../Recipe/RecipeState";

export const events = {
    amountChanged: 'amount-changed'
}

function Amount() {
    const [state] = useState(() => new AmountState())

    function handleChange(e) {
        state.setAmount(e.target.value)
        // recalculate tree with delay
    }

    return (
        <div id="amount">
            <input id="amount_input" type="number" min="0" value={state.amount} onChange={handleChange}/>
        </div>
    )
}

export default observer(Amount)