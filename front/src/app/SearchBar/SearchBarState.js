import {action, makeObservable, observable} from "mobx";
import {Option} from "../GameData/Option";

export class SearchBarState {
    show = true
    /** @type {Option[]}*/
    parts = []
    /** @type {Option[]}*/
    matchedParts = []
    /** @type {?number}*/
    highlightedIndex = null

    constructor() {
        makeObservable(this, {
            show: observable,
            setShow: action,
            //
            //
            matchedParts: observable,
            setMatchedParts: action,
            //
            highlightedIndex: observable,
            setHighlightedIndex: action,
        })
        this.loadParts()
    }

    setHighlightedIndex(i) {
        this.highlightedIndex = i
    }

    setMatchedParts(p) {
        this.matchedParts = p
    }

    setShow(show) {
        this.show = show
    }

    setParts(r) {
        this.parts = r
    }

    handleChange(e) {
        this.setHighlightedIndex(null)
        const found = this.parts.filter((p) => {
            return contains(p.name, e.target.value) || contains(p.displayName, e.target.value)
        })

        this.setMatchedParts(found.slice(0, 11))
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowDown') {
            if (this.highlightedIndex === null) {
                this.stepTo(0)
            } else {
                this.stepTo(this.highlightedIndex + 1)
            }
        }
        if (e.key === 'ArrowUp') {
            if (this.highlightedIndex === null) {
                this.stepTo(this.matchedParts.length - 1)
            } else {
                this.stepTo(this.highlightedIndex - 1)
            }
        }
    }

    stepTo(index) {
        if (index < this.matchedParts.length && index >= 0) {
            this.setHighlightedIndex(index)
        }
    }


    loadParts() {
        fetch("/resource-name-list")
            .then((response) => response.json())
            .then((list) => {
                /** @type {Option[]} */
                let result = []
                for (let i = 0; i < list.length; i++) {
                    let newOpt = new Option()
                    newOpt.name = list[i].name
                    newOpt.displayName = list[i].displayName
                    result.push(newOpt)
                }
                this.setParts(result)
            })
            .catch((err) => {
                console.log(err)
                this.setParts([])
            })
    }
}

/**
 *
 * @param {string} str
 * @param {string} substr
 * @return {boolean}
 */
function contains(str, substr) {
    return str.toLowerCase().includes(substr.toLowerCase())
}