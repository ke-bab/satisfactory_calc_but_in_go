import {action, makeObservable, observable} from "mobx";
import {EventBus} from "../../Bus";


export const events = {
    partChanged: 'part-changed'
}

export class PartState {
    part = ''

    setPart(part) {
        this.part = part
    }

    constructor() {
        makeObservable(this, {
            part: observable,
            setPart: action,
        })
    }

    handleChange(e) {
        this.setPart(e.target.value)
        EventBus.publish(events.partChanged, this.part)
    }
}