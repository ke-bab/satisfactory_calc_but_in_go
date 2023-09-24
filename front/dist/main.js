/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./front/src/app/GameData/GameData.js":
/*!********************************************!*\
  !*** ./front/src/app/GameData/GameData.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameData: () => (/* binding */ GameData)\n/* harmony export */ });\n/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Option */ \"./front/src/app/GameData/Option.js\");\n\n\nclass GameData {\n    /** @type {Option[]}*/\n    parts = []\n    recipes = []\n    datalistHtml = document.querySelector('#parts')\n\n    constructor() {\n        window.addEventListener('load', () => {\n            this.loadParts()\n                .then(() => this.updateView())\n        })\n    }\n\n    loadParts() {\n        return new Promise((resolve, reject) => {\n            fetch(\"/resource-name-list\")\n                .then((response) => response.json())\n                .then((list) => {\n                    /** @type {Option[]} list */\n                    for (let i = 0; i < list.length; i++) {\n                        this.parts.push(list[i])\n                    }\n                    resolve()\n                })\n                .catch(() => {\n                })\n        })\n    }\n\n    updateView() {\n        this.datalistHtml.innerHTML = ''\n        for (let i = 0; i < this.parts.length; i++) {\n            let newOption = document.createElement(\"option\")\n            newOption.value = this.parts[i].name\n            newOption.innerHTML = this.parts[i].displayName\n            this.datalistHtml.appendChild(newOption)\n        }\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/GameData.js?");

/***/ }),

/***/ "./front/src/app/GameData/Option.js":
/*!******************************************!*\
  !*** ./front/src/app/GameData/Option.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Option: () => (/* binding */ Option)\n/* harmony export */ });\nclass Option {\n    name\n    displayName\n}\n\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/Option.js?");

/***/ }),

/***/ "./front/src/app/GameData/Part.js":
/*!****************************************!*\
  !*** ./front/src/app/GameData/Part.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Part: () => (/* binding */ Part)\n/* harmony export */ });\nclass Part {\n    name\n    amount\n}\n\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/Part.js?");

/***/ }),

/***/ "./front/src/app/GameData/Recipe.js":
/*!******************************************!*\
  !*** ./front/src/app/GameData/Recipe.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Recipe: () => (/* binding */ Recipe)\n/* harmony export */ });\n/* harmony import */ var _Part__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part */ \"./front/src/app/GameData/Part.js\");\n\n\nclass Recipe {\n    name = ''\n    displayName = ''\n    /** @type {Part[]} */\n    ingredients = []\n    /** @type {Part[]} */\n    products = []\n    manufactoringDuration = 1\n    producedIn = ''\n}\n\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/Recipe.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/AmountInput.js":
/*!****************************************************!*\
  !*** ./front/src/app/OutputControl/AmountInput.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AmountInput: () => (/* binding */ AmountInput),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bus */ \"./front/src/app/bus.js\");\n/* harmony import */ var _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecipeSelect */ \"./front/src/app/OutputControl/RecipeSelect.js\");\n/* harmony import */ var _PartSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n/* harmony import */ var _GameData_Part__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameData/Part */ \"./front/src/app/GameData/Part.js\");\n\n\n\n\n\n\n\nconst events = {\n    amountChanged: 'amount-changed'\n}\n\nclass AmountInput {\n    /** @type {?PartSearch} */\n    partSearch = null\n    amount = 0\n    view = new View(this)\n\n    constructor() {\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_RecipeSelect__WEBPACK_IMPORTED_MODULE_1__.events.recipeChanged, (recipe) => this.handleRecipeChanged(recipe))\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_PartSearch__WEBPACK_IMPORTED_MODULE_2__.events.partChanged, () => this.handlePartChanged())\n    }\n\n    handlePartChanged() {\n        this.view.hide()\n        this.setAmount(0)\n    }\n\n    setAmount(amount) {\n        this.amount = amount\n        this.view.update()\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.amountChanged, this.amount)\n    }\n\n    /**\n     * @param {?Recipe} recipe\n     */\n    handleRecipeChanged(recipe) {\n        if (recipe === null) {\n            this.view.hide()\n            this.setAmount(0)\n        } else {\n            let part = this.findWantedPartByRecipe(recipe)\n            this.setAmount(60 / recipe.manufactoringDuration * part.amount)\n            this.view.show()\n        }\n    }\n\n    /**\n     * @param {Recipe} recipe\n     * @return {?Part}\n     */\n    findWantedPartByRecipe(recipe) {\n        return recipe.products.find((part) => part.name === this.partSearch.search, null)\n    }\n}\n\nclass View {\n    amountBlock = document.querySelector('#amount')\n    amountInput = document.querySelector('#amount_input')\n\n    constructor(model) {\n        this.hide()\n        this.model = model\n        this.amountInput.addEventListener('change', () => {\n            this.model.setAmount(this.amountInput.value)\n        })\n    }\n\n    update() {\n        this.amountInput.value = this.model.amount\n    }\n\n    hide() {\n        this.amountBlock.classList.remove('shown')\n        this.amountBlock.classList.add('hidden')\n    }\n\n    show() {\n        this.amountBlock.classList.remove('hidden')\n        this.amountBlock.classList.add('shown')\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/AmountInput.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/OutputControl.js":
/*!******************************************************!*\
  !*** ./front/src/app/OutputControl/OutputControl.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OutputControl: () => (/* binding */ OutputControl)\n/* harmony export */ });\n/* harmony import */ var _PartSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecipeSelect */ \"./front/src/app/OutputControl/RecipeSelect.js\");\n/* harmony import */ var _AmountInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AmountInput */ \"./front/src/app/OutputControl/AmountInput.js\");\n\n\n\n\nclass OutputControl {\n    partSearch = new _PartSearch__WEBPACK_IMPORTED_MODULE_0__.PartSearch()\n    recipe = new _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__.RecipeSelect()\n    amountInput = new _AmountInput__WEBPACK_IMPORTED_MODULE_2__.AmountInput()\n    constructor() {\n        this.amountInput.partSearch = this.partSearch\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/OutputControl.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/PartSearch.js":
/*!***************************************************!*\
  !*** ./front/src/app/OutputControl/PartSearch.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PartSearch: () => (/* binding */ PartSearch),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bus */ \"./front/src/app/bus.js\");\n\n\nconst events = {\n    partChanged: 'part-changed'\n}\n\nclass PartSearch {\n    search = ''\n    searchInput = document.querySelector('#parts_input')\n\n    constructor() {\n        this.registerOnChange()\n    }\n\n    registerOnChange() {\n        this.searchInput.addEventListener('change', (event) => {\n            this.search = this.searchInput.value\n            _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.partChanged, this.search)\n        })\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/PartSearch.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/RecipeSelect.js":
/*!*****************************************************!*\
  !*** ./front/src/app/OutputControl/RecipeSelect.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RecipeSelect: () => (/* binding */ RecipeSelect),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bus */ \"./front/src/app/bus.js\");\n/* harmony import */ var _PartSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n\n\n\n\nconst events = {\n    recipeChanged : 'recipe-changed'\n}\n\nclass RecipeSelect {\n    /** @type {?Recipe}*/\n    selectedRecipe = null\n    recipes = []\n    recipesSelect = document.querySelector('#recipe_select')\n    constructor() {\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_PartSearch__WEBPACK_IMPORTED_MODULE_1__.events.partChanged, (part) => {\n            if (part === '') {\n                this.hide()\n                this.drop()\n            } else {\n                this.loadRecipes(part)\n            }\n        })\n        this.recipesSelect.addEventListener('change', (event) => {\n            this.selectedRecipe = this.recipesSelect.options[this.recipesSelect.selectedIndex].recipe\n            _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.recipeChanged, this.selectedRecipe)\n        })\n    }\n\n    drop() {\n        this.recipes = []\n        this.recipesSelect.innerHTML = ''\n    }\n\n    hide() {\n        this.recipesSelect.style.display = 'none'\n    }\n\n    /**\n     * @param {string} part\n     */\n    loadRecipes(part) {\n        fetch('/find-recipe-by-product?product=' + part)\n            .then((response) => response.json())\n            .then((recipeList) => {\n                /** @type {Recipe[]} recipeList*/\n                this.setRecipes(recipeList)\n            })\n            .catch(error => {\n                this.hide()\n                this.drop()\n            })\n    }\n\n    setRecipes(recipes) {\n        this.recipes = recipes\n        this.updateView()\n    }\n\n    updateView() {\n        this.recipesSelect.innerHTML = ''\n        if (this.recipes.length > 0) {\n            this.recipesSelect.style.display = 'block'\n            let emptyOpt = document.createElement('option')\n            emptyOpt.value = ''\n            emptyOpt.innerHTML = 'no recipe'\n            emptyOpt.recipe = null\n            this.recipesSelect.appendChild(emptyOpt)\n            this.recipes.forEach((recipe, index) => {\n                let opt = document.createElement(\"option\")\n                opt.value = recipe.name\n                opt.innerHTML = recipe.displayName\n                opt.recipe = recipe\n                this.recipesSelect.appendChild(opt)\n            })\n        }\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/RecipeSelect.js?");

/***/ }),

/***/ "./front/src/app/Tree/Node/Ingredient.js":
/*!***********************************************!*\
  !*** ./front/src/app/Tree/Node/Ingredient.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ingredient: () => (/* binding */ Ingredient)\n/* harmony export */ });\nclass Ingredient {\n\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Node/Ingredient.js?");

/***/ }),

/***/ "./front/src/app/Tree/Node/Position.js":
/*!*********************************************!*\
  !*** ./front/src/app/Tree/Node/Position.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Position: () => (/* binding */ Position)\n/* harmony export */ });\nclass Position {\n    constructor(x = 0, y = 0) {\n        this.x = x;\n        this.y = y;\n    }\n}\n\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Node/Position.js?");

/***/ }),

/***/ "./front/src/app/Tree/Node/RecipeNode.js":
/*!***********************************************!*\
  !*** ./front/src/app/Tree/Node/RecipeNode.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RecipeNode: () => (/* binding */ RecipeNode),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../bus */ \"./front/src/app/bus.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n/* harmony import */ var _Ingredient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ingredient */ \"./front/src/app/Tree/Node/Ingredient.js\");\n/* harmony import */ var _GameData_Part__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../GameData/Part */ \"./front/src/app/GameData/Part.js\");\n\n\n\n\n\nconst events = {\n    nodeCreated: 'node-created',\n    nodeHtmlCreated: 'node-html-created',\n}\n\nclass RecipeNode {\n    /** @type {Recipe} */\n    recipe\n    /** @type {number} */\n    multiplier = 1.0\n    /** @type {HTMLElement} */\n    cell\n    /** @type {HTMLElement} */\n    cellControl\n    size = 1\n    /** @type {?RecipeNode} */\n    parentNode = null\n    mainProduct = ''\n    /** @type {RecipeNode[]} */\n    childNodes = []\n\n    /** @type {Ingredient[]} */\n    ingredients = []\n    view = new View(this)\n\n    /**\n     * @param {Recipe} recipe\n     */\n    constructor(recipe) {\n        this.recipe = recipe;\n        this.view.createCell(this)\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.nodeCreated, this)\n    }\n\n\n\n    removeHtml() {\n        this.cell.nodeControl.remove()\n        this.cell.remove()\n    }\n\n    /**\n     * @param {RecipeNode} recipeNode\n     */\n    removeRecipeByProduct(recipeNode) {\n        this.removeRecipeNodesDivsRecursive(recipeNode)\n        let index = this.childNodes.indexOf(recipeNode)\n        this.childNodes.splice(index, 1)\n    }\n\n\n    /**\n     * @param {RecipeNode} recipeNode\n     */\n    removeRecipeNodesDivsRecursive(recipeNode) {\n        recipeNode.childNodes.forEach((childNode) => {\n            this.removeRecipeNodesDivsRecursive(childNode)\n        })\n        recipeNode.cell.nodeControl.remove()\n        recipeNode.cell.remove()\n    }\n\n\n    /**\n     * @param {RecipeNode} newRecipe\n     */\n    addIngredientRecipe(newRecipe) {\n        let foundNode = this.childNodes.find((recipeNode) => recipeNode.mainProduct === newRecipe.mainProduct)\n        if (foundNode !== undefined) {\n            this.removeRecipeByProduct(foundNode)\n        }\n        newRecipe.parentNode = this\n        this.childNodes.push(newRecipe)\n        this.updateSizeRecursive()\n    }\n\n    updateSizeRecursive() {\n        this.size = 0\n        if (this.childNodes.length === 0) {\n            this.size = 1\n        } else {\n            for (let i = 0; i < this.childNodes.length; i++) {\n                this.size += this.childNodes[i].size\n            }\n        }\n        if (this.parentNode !== null) {\n            this.parentNode.updateSizeRecursive()\n        }\n    }\n\n    /**\n     * @param {HTMLElement} cell\n     */\n    setCell(cell) {\n        this.cell = cell\n    }\n\n    /**\n     * @param {string} name\n     * @return {boolean}\n     */\n    hasConnectedRecipeByIngredient(name) {\n        let found = this.childNodes.find((node) => node.mainProduct === name)\n        return found !== undefined;\n    }\n\n\n}\n\n\nclass View {\n\n    constructor(model) {\n        this.model = model\n    }\n    /**\n     * @param {RecipeNode} recipeNode\n     * @return HTMLDivElement\n     */\n    createCell(recipeNode) {\n        console.log(\"createCell\")\n        let gridDiv = document.querySelector(\"#grid\")\n        let cell = document.createElement(\"div\")\n        cell.recipeNode = recipeNode\n        recipeNode.setCell(cell)\n\n        cell.classList.add(\"cell\")\n\n        let leftDiv = document.createElement('div')\n        leftDiv.classList.add(\"left\")\n        let rightDiv = document.createElement('div')\n        rightDiv.classList.add(\"right\")\n\n        cell.appendChild(leftDiv)\n        cell.appendChild(rightDiv)\n\n        this.createIngredientDivs(rightDiv, recipeNode)\n\n        let factoryImage = document.createElement('img')\n        factoryImage.src = '/static/images/Assembler.png'\n        leftDiv.appendChild(factoryImage)\n        let factoryCount = document.createElement('div')\n        factoryCount.innerHTML = 'x' + recipeNode.multiplier\n        leftDiv.appendChild(factoryCount)\n\n        gridDiv.appendChild(cell)\n        let nodeControl = document.createElement('div')\n        nodeControl.classList.add('selected-node-control')\n        nodeControl.style.display = 'none'\n        cell.nodeControl = nodeControl\n        nodeControl.cell = cell\n        let leftPanel = document.querySelector('#left-panel')\n        leftPanel.appendChild(nodeControl)\n        recipeNode.recipe.ingredients.forEach((ingredient) => {\n            this.createIngredientRecipeSelector(ingredient, nodeControl)\n        })\n        this.registerCellEvent()\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.nodeHtmlCreated, this)\n\n        return cell\n    }\n\n    /**\n     * @param {Part} ingredient\n     * @param {HTMLElement} nodeControl\n     */\n    createIngredientRecipeSelector(ingredient, nodeControl) {\n        let ingredientDiv = document.createElement('div')\n        let image = document.createElement('img')\n        let select = document.createElement('select')\n        select.addEventListener('change', (event) => {\n            let recipeNode = nodeControl.cell.recipeNode\n            let newNode = new RecipeNode(event.target.options[event.target.selectedIndex].recipe)\n            newNode.mainProduct = ingredient.name\n            recipeNode.addIngredientRecipe(newNode)\n            // add to total\n        })\n        let emptyOption = document.createElement('option')\n        emptyOption.value = ''\n        emptyOption.innerHTML = 'no recipe'\n        select.appendChild(emptyOption)\n        nodeControl.appendChild(ingredientDiv)\n        ingredientDiv.appendChild(image)\n        ingredientDiv.appendChild(select)\n        /** @param {Recipe[]} recipes */\n        let fillSelect = (recipes) => {\n            recipes.forEach((recipe) => {\n                let newOpt = document.createElement('option')\n                newOpt.value = recipe.name\n                newOpt.recipe = recipe\n                newOpt.innerHTML = recipe.displayName\n                select.appendChild(newOpt)\n            })\n        }\n        fetch('/find-recipe-by-product?product=' + ingredient.name)\n            .then((resp) => resp.json())\n            .then((json) => fillSelect(json))\n            .catch(() => {\n            })\n    }\n\n    registerCellEvent() {\n        let cells = document.querySelectorAll('.cell')\n        cells.forEach((cell) => cell.addEventListener('click', (event) => {\n            document.querySelectorAll('.selected-node-control').forEach((el) => el.style.display = 'none')\n            event.target.closest('.cell').nodeControl.style.display = 'block'\n        }))\n    }\n\n\n    /**\n     * @param {HTMLElement} rightDiv\n     * @param {RecipeNode} recipeNode\n     */\n    createIngredientDivs(rightDiv, recipeNode) {\n        recipeNode.recipe.ingredients.forEach((ingredient) => {\n            let ingredientDiv = document.createElement('div')\n            ingredientDiv.classList.add('ingredient')\n            let w = 100\n            let h = 100\n            let len = recipeNode.recipe.ingredients.length\n            if (len === 2) {\n                w = 50\n            }\n            if (len === 3 || len === 4) {\n                w = 50\n                h = 50\n            }\n            ingredientDiv.style.width = w + '%'\n            ingredientDiv.style.height = h + '%'\n\n            let image = document.createElement('img')\n            image.src = '/static/images/Assembler.png'\n            image.classList.add('image')\n            let countDiv = document.createElement('div')\n            countDiv.classList.add('count')\n            countDiv.style.fontSize = len === 1 ? \"1em\" : \"0.5em\"\n            countDiv.innerHTML = ingredient.amount + '/m'\n            ingredientDiv.appendChild(image)\n            ingredientDiv.appendChild(countDiv)\n            rightDiv.appendChild(ingredientDiv)\n        })\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Node/RecipeNode.js?");

/***/ }),

/***/ "./front/src/app/Tree/Tree.js":
/*!************************************!*\
  !*** ./front/src/app/Tree/Tree.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tree: () => (/* binding */ Tree),\n/* harmony export */   height: () => (/* binding */ height),\n/* harmony export */   width: () => (/* binding */ width)\n/* harmony export */ });\n/* harmony import */ var _Node_RecipeNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node/RecipeNode */ \"./front/src/app/Tree/Node/RecipeNode.js\");\n/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../bus */ \"./front/src/app/bus.js\");\n/* harmony import */ var _OutputControl_RecipeSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../OutputControl/RecipeSelect */ \"./front/src/app/OutputControl/RecipeSelect.js\");\n/* harmony import */ var _OutputControl_PartSearch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../OutputControl/PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n/* harmony import */ var _Node_Position__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Node/Position */ \"./front/src/app/Tree/Node/Position.js\");\n\n\n\n\n\n\n\nclass Tree {\n    /** @type ?RecipeNode */\n    root = null\n    view = new View(this)\n\n    constructor() {\n        _bus__WEBPACK_IMPORTED_MODULE_1__.EventBus.subscribe(_OutputControl_RecipeSelect__WEBPACK_IMPORTED_MODULE_2__.events.recipeChanged, (recipe) => this.changeRoot(recipe))\n        _bus__WEBPACK_IMPORTED_MODULE_1__.EventBus.subscribe(_OutputControl_PartSearch__WEBPACK_IMPORTED_MODULE_3__.events.partChanged, () => this.removeSubTree(this.root))\n    }\n\n    /**\n     * @param {Recipe} recipe\n     */\n    changeRoot(recipe) {\n        if (this.root !== null) {\n            this.removeSubTree(this.root)\n        }\n        this.root = new _Node_RecipeNode__WEBPACK_IMPORTED_MODULE_0__.RecipeNode(recipe)\n    }\n\n    /**\n     * @param {RecipeNode} startNode\n     */\n    removeSubTree(startNode) {\n        if (startNode === null) {\n            return\n        }\n        startNode.childNodes.forEach((node) => this.removeSubTree(node))\n        startNode.removeHtml()\n        this.view.updatePositions()\n    }\n}\n\nconst width = 10\nconst height = 5\n\nclass View {\n\n    constructor(model) {\n        this.model = model\n    }\n\n    update() {\n\n    }\n\n    updatePositions(recipeNode = this.model.root, pos = new _Node_Position__WEBPACK_IMPORTED_MODULE_5__.Position(0, 0), deepLevel = 0) {\n        if (recipeNode === null) {\n            return\n        }\n        recipeNode.cell.style.left = pos.x * width + (deepLevel) + \"em\"\n        recipeNode.cell.style.top = pos.y * height + \"em\"\n        deepLevel++\n        for (let i = 0; i < recipeNode.childNodes.length; i++) {\n            let y = pos.y + i\n            if (i > 0) {\n                y = pos.y + i + (recipeNode.childNodes[i - 1].size - 1)\n            }\n            this.updatePositions(\n                recipeNode.childNodes[i],\n                new _Node_Position__WEBPACK_IMPORTED_MODULE_5__.Position(pos.x + 1, y),\n                deepLevel\n            )\n        }\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Tree.js?");

/***/ }),

/***/ "./front/src/app/app.js":
/*!******************************!*\
  !*** ./front/src/app/app.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _OutputControl_OutputControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OutputControl/OutputControl */ \"./front/src/app/OutputControl/OutputControl.js\");\n/* harmony import */ var _GameData_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameData/GameData */ \"./front/src/app/GameData/GameData.js\");\n/* harmony import */ var _Tree_Tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tree/Tree */ \"./front/src/app/Tree/Tree.js\");\n\n\n\n\nclass App {\n    tree = new _Tree_Tree__WEBPACK_IMPORTED_MODULE_2__.Tree()\n    out = new _OutputControl_OutputControl__WEBPACK_IMPORTED_MODULE_0__.OutputControl()\n    gameData = new _GameData_GameData__WEBPACK_IMPORTED_MODULE_1__.GameData()\n\n\n    run() {\n\n    }\n}\n\n\n//# sourceURL=webpack://factory-calc/./front/src/app/app.js?");

/***/ }),

/***/ "./front/src/app/bus.js":
/*!******************************!*\
  !*** ./front/src/app/bus.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventBus: () => (/* binding */ EventBus)\n/* harmony export */ });\nclass EventBus {\n    static events = []\n\n    static publish(name, ...args) {\n        const callbackList = this.events[name];\n\n        if (!callbackList) return console.warn(name + \" not found!\");\n\n        for (let callback of callbackList) {\n            callback(...args);\n        }\n    }\n\n    static subscribe(name, callback) {\n        if (!this.events[name]) {\n            this.events[name] = [];\n        }\n\n        this.events[name].push(callback);\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/bus.js?");

/***/ }),

/***/ "./front/src/main.js":
/*!***************************!*\
  !*** ./front/src/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app */ \"./front/src/app/app.js\");\n\n\nnew _app_app__WEBPACK_IMPORTED_MODULE_0__.App().run()\n\n\n//# sourceURL=webpack://factory-calc/./front/src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./front/src/main.js");
/******/ 	
/******/ })()
;