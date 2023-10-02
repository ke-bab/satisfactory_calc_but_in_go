import {observer} from "mobx-react-lite";
import {useState} from "react";
import {DetailsState} from "./DetailsState";

function Details() {
    const [state] = useState(new DetailsState())

    return (
        <div id="details"></div>
    )
}

export default observer(Details)