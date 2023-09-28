import {EventBus} from "../Bus";
import {useState} from "react";

export const events = {
    partChanged: 'part-changed'
}

export function PartSearch() {
    const [part, setPart] = useState('')
    function handleChange(event) {
        EventBus.publish(events.partChanged, event.target.value)
    }

    return (
        <>
            <input id="parts_input" list="parts" placeholder="type here" onChange={handleChange}/>
        </>
    )
}