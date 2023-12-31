import {observer} from "mobx-react-lite";
import './hud-controls.css'

function HUDControls() {
    return (
        <div id="hud-controls">
            <div>
                <div>E</div>
                <div></div>
                <img src="/static/images/factory-hotkey.svg" alt=""/>
            </div>
            <div>
                <div>N</div>
                <div></div>
                <img src="/static/images/search.svg" alt=""/>
            </div>
            <div>
                <div>Esc</div>
                <div></div>
                <img src="/static/images/cross.svg" alt=""/>
            </div>
        </div>
    )
}

export default observer(HUDControls)