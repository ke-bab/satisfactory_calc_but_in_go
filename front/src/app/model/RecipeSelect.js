import {EventBus} from "../bus";
import {partClear, partSelected} from "./PartSearch";
import {Recipe} from "./Recipe";

export class RecipeSelect {
    recipes = []
    recipesSelect = document.querySelector('#recipe_select')
    constructor() {
        EventBus.subscribe(partSelected, (recipes) => {
            this.recipes = recipes
            this.updateView()
        })
        EventBus.subscribe(partClear, () => {
            this.recipes = []
            this.updateView()
        })
    }

    updateView() {
        this.recipesSelect.innerHTML = ''
        if (this.recipes.length === 0) {
            this.recipesSelect.style.display = 'none'
        } else {
            this.recipesSelect.style.display = 'block'
            let emptyOpt = document.createElement('option')
            emptyOpt.value = ''
            emptyOpt.innerHTML = 'no recipe'
            this.recipesSelect.appendChild(emptyOpt)
            this.recipes.forEach((recipe, index) => {
                let opt = document.createElement("option")
                opt.value = recipe.name
                opt.innerHTML = recipe.displayName
                opt.recipe = recipe
                this.recipesSelect.appendChild(opt)
            })
        }
    }
}