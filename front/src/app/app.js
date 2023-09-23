import {OutputControl} from "./model/OutputControl";
import {GameData} from "./model/GameData";
import {EventBus} from "./bus";
import {partSelected} from "./model/PartSearch";

export class App {
    // render = new Render()
    // tree = new Tree()
    // rootControl = new RootControl()
    // total = new Total()
    out = new OutputControl()
    gameData = new GameData()


    run() {


        // this.render.rootNode = this.tree.root
        //
        // this.rootControl.init()
        // EventBus.subscribe('node-created', (recipeNode) => {
        //     this.render.createCell(recipeNode)
        // })
        // EventBus.subscribe('root-recipe-selected', (recipe) => {
        //     this.tree.changeRoot(recipe)
        // })
    }
}
