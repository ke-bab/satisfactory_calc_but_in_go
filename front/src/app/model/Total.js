export class Total {
    /** @type {Map<string, number>} */
    resources = new Map()

    add(name, amount) {
        let mapAmount = this.resources.get(name)
        if (mapAmount !== undefined) {
            this.resources.set(name, mapAmount + amount)
        } else {
            this.resources.set(name, amount)
        }
        this.update(name)
    }

    remove(name, amount) {

    }

    update(name) {
        let total = document.querySelector('#total')
        let divs = total.getElementsByTagName('div')
        let nameDiv = undefined
        for (let i = 0; i < divs.length; i++) {
            if (name === divs[i].innerText) {
                nameDiv = divs[i]
                break
            }
        }
        // let nameDiv = divs.find((div) => div.innerText === name)
        if (nameDiv !== undefined) {
            alert('not implemented')
        } else {
            let newTotalDiv = document.createElement('div')
            let totalNameDiv = document.createElement('div')
            let totalAmountDiv = document.createElement('div')
            newTotalDiv.appendChild(totalNameDiv)
            newTotalDiv.appendChild(totalAmountDiv)
            total.appendChild(newTotalDiv)
            totalAmountDiv.innerText = this.resources.get(name) + ''
        }
    }
}