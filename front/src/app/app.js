import {fillRecipeOptions, fillResourceNames, Render, render} from './model/html/render'
import {clearTree, fillAmount, RecipeNode, Tree} from "./model/tree";
import {EventBus} from "./bus";


export class App {
    run() {

        let render = new Render()
        let tree = new Tree()
        render.rootNode = tree.root
        EventBus.subscribe('node-created', render.createCell)

        window.onload = (event) => {
            fetch("/resource-name-list")
                .then((response) => response.json())
                .then((json) => {
                    fillResourceNames(json)
                })
                .catch(() => {
                })
            let wanted_resource_input = document.querySelector('#wanted_resource_input')

            wanted_resource_input.addEventListener('change', (e) => {
                clearTree()
                if (e.target.value === '') {
                    return
                }
                fetch('/find-recipe-by-product?product=' + e.target.value)
                    .then((response) => response.json())
                    .then((json) => fillRecipeOptions(json))
                    .catch(error => {
                        clearTree() // ?
                    })
            })
            let recipe_select = document.querySelector('#recipe_select')
            recipe_select.addEventListener('change', (event) => {
                let recipe = event.target.options[event.target.selectedIndex].recipe
                fillAmount(recipe)
                let root = document.querySelector('#root-control')
                root.recipeNode = new RecipeNode(recipe)
                root.recipeNode.mainProduct = recipe_select.value
                render()
            })
        };
    }
}
