import {PartSearch} from "./PartSearch";
import {RecipeSelect} from "./RecipeSelect";
import {AmountInput} from "./AmountInput";

export class OutputControl {
    partSearch = new PartSearch()
    recipe = new RecipeSelect()
    amountInput = new AmountInput()
    init() {

    }
}