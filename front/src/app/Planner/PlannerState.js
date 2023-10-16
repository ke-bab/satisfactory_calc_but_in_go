import {action, makeObservable, observable} from "mobx";

export class PlannerState {
    show = false

    constructor() {
        makeObservable(this, {
            show: observable,
            setShow: action,
        })
    }

    setShow(show) {
        this.show = show
    }
}