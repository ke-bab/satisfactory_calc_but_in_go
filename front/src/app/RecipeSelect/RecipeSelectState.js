import {action, makeObservable, observable} from "mobx";


export class RecipeSelectState {
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

    handleSearchLocked() {
        this.setShow(true)
    }
}