import {fillRecipeOptions, Render} from './model/html/Render'
import {RecipeNode, Tree} from "./model/tree";
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
        EventBus.subscribe('node-created', this.render.createCell)
        this.rootControl.init()
    }
}
