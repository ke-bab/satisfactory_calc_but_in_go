import {action, makeObservable, observable} from "mobx";

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
}