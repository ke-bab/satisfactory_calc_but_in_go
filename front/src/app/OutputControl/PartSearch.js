import {EventBus} from "../Bus";

export const events = {
    partChanged: 'part-changed'
}

export class PartSearch {
    // search = ''
    // searchInput = document.querySelector('#parts_input')
    //
    // constructor() {
    //     this.registerOnChange()
    // }
    //
    // registerOnChange() {
    //     this.searchInput.addEventListener('change', (event) => {
    //         this.search = this.searchInput.value
    //         EventBus.publish(events.partChanged, this.search)
    //     })
    // }
}

export function PartSearchReact() {
    function handleChange(event) {
        EventBus.publish(events.partChanged, event.target.value)
    }

    return (
        <>
            <input id="parts_input" list="parts" placeholder="type here" onChange={(event) => handleChange(event)}/>
        </>
    )
}