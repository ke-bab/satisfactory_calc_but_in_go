import {EventBus} from "../bus";

export const events = {
    partSelected: 'part-selected'
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
            EventBus.publish(events.partSelected, this.search)
        })
    }
}