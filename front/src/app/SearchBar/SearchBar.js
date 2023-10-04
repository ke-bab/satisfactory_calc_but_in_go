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
                if (state.isLocked()) {
                    state.unlock()
                } else {
                    state.setShow(false)
                    state.setMatchedParts([])
                    state.setHighlightedIndex(null)
                }
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
            document.removeEventListener('onkeydown', handleKeyDown, true)
        }
    }, []);

    useEffect(() => {
        if (state.show && ref !== null) {
            ref.current.focus()
        }
    }, [state.show])

    if (state.show) {
        let classNameContainer = state.isLocked() ? 'moved-up' : 'centered'

        return (
            <div
                id="search-container"
                onKeyDown={(e) => state.handleKeyDown(e)}
                className={classNameContainer}
            >
                <div className="label">
                    <span className="fics">FICS</span>
                    <span className="it">IT</span>
                    <span className="quicksearch"> QUICK SEARCH</span>
                </div>
                <input
                    value={state.value}
                    ref={ref} className="search-bar" placeholder="Search"
                    onChange={(e) => state.handleChange(e)}>
                </input>
                <div className="results">
                    {state.matchedParts.map((o, index) => {
                        const isHighlighted = index === state.highlightedIndex
                        let classes = 'search-result'
                        if (isHighlighted) {
                            classes += ' highlighted'
                        }

                        return <div key={o.name} className={classes}>
                            <img src="/static/images/Assembler.png" alt=""/>
                            <div>
                                {o.displayName}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default observer(SearchBar)