import {observer} from "mobx-react-lite";
import {useState} from "react";
import {TotalState} from "./TotalState";

function Total() {
    const [state] = useState(() => new TotalState())
    
    return (
        <div id="total">
            {
                Object.entries(state.listTotals).map((object, index) => {
                    return <div key={index}>{object[0]}: {object[1] + "/m"}</div>
                })
            }
        </div>
    )
}

export default observer(Total)