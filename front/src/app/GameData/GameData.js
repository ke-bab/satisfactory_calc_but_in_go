import {Option} from "../model/html/Render";

export class GameData {
    /** @type {Option[]}*/
    parts = []
    recipes = []
    datalistHtml = document.querySelector('#parts')

    constructor() {
        window.addEventListener('load', () => {
            this.loadParts()
                .then(() => this.updateView())
        })
    }

    loadParts() {
        return new Promise((resolve, reject) => {
            fetch("/resource-name-list")
                .then((response) => response.json())
                .then((list) => {
                    /** @type {Option[]} list */
                    for (let i = 0; i < list.length; i++) {
                        this.parts.push(list[i])
                    }
                    resolve()
                })
                .catch(() => {
                })
        })
    }

    updateView() {
        this.datalistHtml.innerHTML = ''
        for (let i = 0; i < this.parts.length; i++) {
            console.log('ok')
            let newOption = document.createElement("option")
            newOption.value = this.parts[i].name
            newOption.innerHTML = this.parts[i].displayName
            this.datalistHtml.appendChild(newOption)
        }
    }
}