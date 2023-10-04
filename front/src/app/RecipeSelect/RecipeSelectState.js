import {action, makeObservable, observable} from "mobx";
import {EventBus} from "../Bus";
import {events as searchEvents} from "../SearchBar/SearchBarState";


export class RecipeSelectState {
    show = false

    constructor() {
        makeObservable(this, {
            show: observable,
            setShow: action,
        })
        EventBus.subscribe(searchEvents.locked, () => this.handleSearchLocked())
    }

    setShow(show) {
        this.show = show
    }

    handleSearchLocked() {
        this.setShow(true)
    }
}