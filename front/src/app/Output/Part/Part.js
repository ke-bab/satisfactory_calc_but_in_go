import {EventBus} from "../../Bus";
import {useState} from "react";
import './part-search.css'
import {PartState} from "./PartState";
import {observer} from "mobx-react-lite";


function Part() {
    const [state] = useState(() => new PartState())

    return (
        <div id="part-search">
            <input id="parts_input" list="parts" placeholder="type here" onChange={(e) => state.handleChange(e)}/>
        </div>
    )
}

export default observer(Part)