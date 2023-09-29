import {EventBus} from "../Bus";
import {useState} from "react";
import './part-search.css'

export const events = {
    partChanged: 'part-changed'
}

export function PartSearch() {
    const [part, setPart] = useState('')

    function handleClick(event) {
        EventBus.publish(events.partChanged, part)
    }

    function handleChange(event) {
        setPart(event.target.value)
    }

    return (
        <div id="part-search">
            <input id="parts_input" list="parts" placeholder="type here" value={part} onChange={handleChange}/>
            <img src="/static/images/play-button.svg" alt="" onClick={handleClick}/>
        </div>
    )
}