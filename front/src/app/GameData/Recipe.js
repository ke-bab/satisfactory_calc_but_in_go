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
}
