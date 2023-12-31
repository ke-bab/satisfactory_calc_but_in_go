export class Part {
    name
    displayName
    amount
    constructor(name = '', amount = 1, displayName = '') {
        this.name = name;
        this.amount = amount;
        this.displayName = displayName;
    }

    /**
     *
     * @param {Recipe} recipe
     */
    amountPerMin(recipe) {
        return 60 / recipe.manufactoringDuration * this.amount
    }

    /**
     * @return {string}
     */
    imgSrc40px() {
        let nameUnderscored = this.displayName.repeat(1).replaceAll(" ", "_")
        return "/static/images/items/" + nameUnderscored + "/" + "40px-" + nameUnderscored + ".png"
    }
}
