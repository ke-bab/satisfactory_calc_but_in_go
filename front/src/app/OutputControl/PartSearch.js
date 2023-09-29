import {EventBus} from "../Bus";
import {useState} from "react";

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
        <>
            <input id="parts_input" list="parts" placeholder="type here" value={part} onChange={handleChange}/>
            <div onClick={handleClick}>enter</div>
        </>
    )
}