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

    return (
        <div id="amount">
            <input id="amount_input" type="number" min="0" value={state.amount} onChange={(e) => state.handleAmountChanged(e)}/>
        </div>
    )
}

export default observer(Amount)