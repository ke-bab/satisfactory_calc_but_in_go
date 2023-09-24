import {EventBus} from "../bus";

export const events = {
    partChanged: 'part-changed'
}

export class PartSearch {
    search = ''
    searchInput = document.querySelector('#parts_input')

    constructor() {
        this.registerOnChange()
    }

    registerOnChange() {
        this.searchInput.addEventListener('change', (event) => {
            this.search = this.searchInput.value
            EventBus.publish(events.partChanged, this.search)
        })
    }
}