import {action, makeObservable, observable} from "mobx";

export class SearchBarState {
    show = true

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