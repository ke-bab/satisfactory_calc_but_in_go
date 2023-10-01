import {EventBus} from "../Bus";
import {useState} from "react";
import './part-search.css'
import {PartState} from "./PartState";
import {observer} from "mobx-react-lite";

export const events = {
    partChanged: 'part-changed'
}

function PartSearch() {
    const [part, setPart] = useState('')
    const [state] = useState(new PartState())

    function handleChange(e) {
        state.setPart(e.target.value)
    }

    function handleClick() {
        EventBus.publish(events.partChanged, state.part)
    }

    return (
        <div id="part-search">
            <input id="parts_input" list="parts" placeholder="type here" onChange={handleChange} />
            <img src="/static/images/play-button.svg" alt="" onClick={handleClick}/>
        </div>
    )
}

export default observer(PartSearch)