import {Part} from "./Part";

export class Recipe {
    name = ''
    displayName = ''
    /** @type {Part[]} */
    ingredients = []
    /** @type {Part[]} */
    products = []
    manufactoringDuration = 1
    producedIn = ''

    findProduct(name) {
        const found = this.products.find((p) => p.name = name)
        if (!found) {
            return null
        }

        return found
    }
}
