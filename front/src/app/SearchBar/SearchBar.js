import {observer} from "mobx-react-lite";
import './search-bar.css'
import {useEffect, useRef, useState} from "react";
import {SearchBarState} from "./SearchBarState";

function SearchBar() {
    const [state] = useState(() => new SearchBarState())
    const ref = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                state.setShow(false)
            }

            if (document.activeElement.tagName !== 'INPUT') {
                if ((e.key === 'N' || e.key === 'n') && !state.show) {
                    state.setShow(true)
                    e.preventDefault()
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown, true)
        return () => {
            document.removeEventListener('onkeydown', handleKeyDown,true)
        }
    }, []);

    useEffect(() => {
        if (state.show && ref !== null) {
            ref.current.focus()
        }
    }, [state.show])

    if (state.show) {
        return (
            <div id="search-container">
                <div className="label">
                    <span className="fics">FICS</span>
                    <span className="it">IT</span>
                    <span className="quicksearch"> QUICK SEARCH</span>
                </div>
                <input ref={ref} className="search-bar" placeholder="Search"></input>
            </div>
        )
    } else {
        return null
    }
}

export default observer(SearchBar)