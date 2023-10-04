import {observer} from "mobx-react-lite";
import {Ingredient} from "./Ingredient";
import {NodeState} from "./NodeState";

/**
 *
 * @param {NodeState} state
 * @param index
 * @return {JSX.Element}
 * @constructor
 */
function Node({state, keyK: index}) {

    function getWidthHeight(len) {
        let w = 100
        let h = 100

        if (len === 2) {
            w = 50
        }
        if (len === 3 || len === 4) {
            w = 50
            h = 50
        }

        return {
            width: w + '%',
            height: w + '%',
        }
    }


    /**
     *
     * @param {Ingredient} ingredient
     * @param {number} index
     * @return {JSX.Element}
     */
    function mapIngredients(ingredient, index) {

        const styles = getWidthHeight(state.ingredients.length)

        return <div key={index} style={styles} className="ingredient">
            <img className="image" src="/static/images/Assembler.png" alt=""/>
            <div className="count">{ingredient.amountPerMinX  + '/m'}</div>
        </div>
    }

    const style = {
        left: state.pos.x + "em",
        top: state.pos.y + "em",
    }

    return (
        <div className={"cell"} key={index} onClick={(e) => state.handleClick(e)} style={style}>
            <div className="left">
                <img src="/static/images/Assembler.png" alt=""/>
                <div>x{state.multiplier.toFixed(3)}</div>
            </div>
            <div className="right">
                {
                    state.ingredients.map(mapIngredients)
                }
            </div>
        </div>
    )
}

export default observer(Node)
