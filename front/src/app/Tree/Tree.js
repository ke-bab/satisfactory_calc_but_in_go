import {observer} from "mobx-react-lite";
import {useState} from "react";
import {TreeState} from "./TreeState";
import Node from './Node/Node'

function Tree() {
    const [state] = useState(() => new TreeState())


    return (
        <div id="tree">
            {state.getAllNodesAsList().map((nodeState, index) => {
                return <Node state={nodeState} key={index}/>
            })}
        </div>
    )
}

export default observer(Tree)
