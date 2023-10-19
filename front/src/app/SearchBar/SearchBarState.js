import {action, makeObservable, observable} from "mobx";
import {Option} from "../GameData/Option";
import {EventBus} from "../Bus";

export const events = {
    selected: 'item-selected',
}

export class SearchBarState {
    show = true
    /** @type {Option[]}*/
    parts = []
    /** @type {Option[]}*/
    matchedParts = []
    /** @type {?number}*/
    highlightedIndex = null
    /** @type {?Option}*/
    selectedPart = null
    value = ''

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
            //
            value: observable,
            setValue: action,
        })
        this.loadParts()
    }

    setValue(v) {
        this.value = v
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
        this.setValue(e.target.value)
        this.setHighlightedIndex(null)
        if (e.target.value === '') {
            this.setMatchedParts([])
            return
        }
        const found = this.parts.filter((p) => {
            return contains(p.displayName, e.target.value)
        })

        this.setMatchedParts(found.slice(0, 10))
    }

    isLocked() {
        return this.selectedPart !== null
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (this.highlightedIndex === null) {
                this.stepTo(0)
            } else {
                this.stepTo(this.highlightedIndex + 1)
            }
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (this.highlightedIndex === null) {
                this.stepTo(this.matchedParts.length - 1)
            } else {
                this.stepTo(this.highlightedIndex - 1)
            }
        }
        if (e.key === 'Enter')  {
            this.select()
        }
    }

    stepTo(index) {
        if (index < this.matchedParts.length && index >= 0) {
            this.setHighlightedIndex(index)
        }
    }

    select() {
        if (this.highlightedIndex >= this.matchedParts.length || this.highlightedIndex === null) {
            return
        }
        this.selectedPart = this.matchedParts[this.highlightedIndex]
        this.setValue(this.selectedPart.displayName)
        this.setMatchedParts([])
        this.setHighlightedIndex(null)
        EventBus.publish(events.selected, this.selectedPart.name)
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