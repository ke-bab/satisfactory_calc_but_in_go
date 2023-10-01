import {makeObservable, observable} from "mobx";
import {EventBus} from "../Bus";
import {events as partEvents} from "./PartSearch";

export class RecipeState {
    show = false
    subscribed = false
    constructor() {
        makeObservable(this, {
            show: observable,
        })

        EventBus.subscribe(partEvents.partChanged, (part) => {this.handlePartChanged(part)} )
    }

    handlePartChanged(part) {
        console.log("console log from recipe state")
        console.log(part)
    }
}