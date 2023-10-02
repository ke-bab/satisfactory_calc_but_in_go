import {makeObservable, observable} from "mobx";

export class DetailsState {
    node = null
    constructor() {
        makeObservable(this, {
            node: observable,
        })
    }
}