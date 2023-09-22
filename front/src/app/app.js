import {Render} from './model/html/Render'
import {Tree} from "./model/Tree";
import {EventBus} from "./bus";
import {RootControl} from "./model/html/output/RootControl";
import {Total} from "./model/html/Total";


export class App {
    render = new Render()
    tree = new Tree()
    rootControl = new RootControl()
    total = new Total()

    run() {
        this.render.rootNode = this.tree.root
        this.rootControl.init()
        EventBus.subscribe('node-created', (recipeNode) => {
            this.render.createCell(recipeNode)
        })
        EventBus.subscribe('root-recipe-selected', (recipe) => {
            this.tree.changeRoot(recipe)
        })
    }
}
