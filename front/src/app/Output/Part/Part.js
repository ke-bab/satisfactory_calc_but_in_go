import {EventBus} from "../../Bus";
import {useState} from "react";
import './part-search.css'
import {PartState} from "./PartState";
import {observer} from "mobx-react-lite";

export const events = {
    partChanged: 'part-changed'
}

function Part() {
    const [state] = useState(new PartState())

    function handleChange(e) {
        state.setPart(e.target.value)
        EventBus.publish(events.partChanged, state.part)
    }

    return (
        <div id="part-search">
            <input id="parts_input" list="parts" placeholder="type here" onChange={handleChange} />
        </div>
    )
}

export default observer(Part)