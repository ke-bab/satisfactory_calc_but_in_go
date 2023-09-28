import {useEffect, useState} from "react";
import {Option} from './Option'

export function Datalist() {
    const [options, setOptions] = useState(
        /** @type {Option[]}  */
        []
    )

    useEffect(() => {
        fetch("/resource-name-list")
            .then((response) => response.json())
            .then(( list ) => {
                /** @type {Option[]} */
                let result = []
                for (let i = 0; i < list.length; i++) {
                    let newOpt = new Option()
                    newOpt.name = list[i].name
                    newOpt.displayName = list[i].displayName
                    result.push(newOpt)
                }

                setOptions(result)
            })
            .catch((err) => {
                console.log(err)
            })
        return () => {}
    }, [setOptions]);

    return (
        <datalist id="parts">
            {options.map((option, index) =>
                <option key={index} value={option.name}>{option.displayName}</option>
            )}
        </datalist>
    )
}