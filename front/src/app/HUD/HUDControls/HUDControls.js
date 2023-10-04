import {observer} from "mobx-react-lite";
import './hud-controls.css'

function HUDControls() {
    return (
        <div id="hud-controls">
            <div>
                <div>N</div>
                <div></div>
                <img src="/static/images/search.svg" alt=""/>
            </div>

        </div>
    )
}

export default observer(HUDControls)