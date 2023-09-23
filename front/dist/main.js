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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameData: () => (/* binding */ GameData)\n/* harmony export */ });\n/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Option */ \"./front/src/app/GameData/Option.js\");\n\n\nclass GameData {\n    /** @type {Option[]}*/\n    parts = []\n    recipes = []\n    datalistHtml = document.querySelector('#parts')\n\n    constructor() {\n        window.addEventListener('load', () => {\n            this.loadParts()\n                .then(() => this.updateView())\n        })\n    }\n\n    loadParts() {\n        return new Promise((resolve, reject) => {\n            fetch(\"/resource-name-list\")\n                .then((response) => response.json())\n                .then((list) => {\n                    /** @type {Option[]} list */\n                    for (let i = 0; i < list.length; i++) {\n                        this.parts.push(list[i])\n                    }\n                    resolve()\n                })\n                .catch(() => {\n                })\n        })\n    }\n\n    updateView() {\n        this.datalistHtml.innerHTML = ''\n        for (let i = 0; i < this.parts.length; i++) {\n            console.log('ok')\n            let newOption = document.createElement(\"option\")\n            newOption.value = this.parts[i].name\n            newOption.innerHTML = this.parts[i].displayName\n            this.datalistHtml.appendChild(newOption)\n        }\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/GameData.js?");

/***/ }),

/***/ "./front/src/app/GameData/Option.js":
/*!******************************************!*\
  !*** ./front/src/app/GameData/Option.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Option: () => (/* binding */ Option)\n/* harmony export */ });\nclass Option {\n    name\n    displayName\n}\n\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/Option.js?");

/***/ }),

/***/ "./front/src/app/GameData/Recipe.js":
/*!******************************************!*\
  !*** ./front/src/app/GameData/Recipe.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Recipe: () => (/* binding */ Recipe)\n/* harmony export */ });\nclass Recipe {\n    name = ''\n    displayName = ''\n    /** @type {Resource[]} */\n    ingredients = []\n    /** @type {Resource[]} */\n    products = []\n    manufactoringDuration = 1\n    producedIn = ''\n}\n\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/Recipe.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/AmountInput.js":
/*!****************************************************!*\
  !*** ./front/src/app/OutputControl/AmountInput.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AmountInput: () => (/* binding */ AmountInput),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bus */ \"./front/src/app/bus.js\");\n/* harmony import */ var _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecipeSelect */ \"./front/src/app/OutputControl/RecipeSelect.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n\n\n\n\nconst events = {\n    amountChanged: 'amount-changed'\n}\n\nclass AmountInput {\n    selectedPart = ''\n    amountInput = document.querySelector('#amount')\n    amount = 0\n\n    constructor() {\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_RecipeSelect__WEBPACK_IMPORTED_MODULE_1__.events.recipeChanged, (recipe) => {\n            this.setAmountByRecipe(recipe)\n        })\n        this.amountInput.addEventListener('change', () => {\n            this.amount = this.amountInput.value\n            this.updateView()\n            _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.amountChanged, this.amount)\n        })\n    }\n\n    updateView() {\n        if (this.selectedPart === '') {\n            this.amountInput.style.display = 'none'\n        } else {\n            this.amountInput.style.display = 'block'\n        }\n        this.amountInput.value = this.amount\n    }\n\n    setAmountByRecipe(recipe) {\n        /** @type {?Recipe} recipe*/\n        if (recipe === null) {\n            this.amount = 0\n        } else {\n            let resource = recipe.products.find((r) => r.name === this.selectedPart, null)\n            this.amount = 60 / recipe.manufactoringDuration * resource.amount\n        }\n        this.updateView()\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.amountChanged, this.amount)\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/AmountInput.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/OutputControl.js":
/*!******************************************************!*\
  !*** ./front/src/app/OutputControl/OutputControl.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OutputControl: () => (/* binding */ OutputControl)\n/* harmony export */ });\n/* harmony import */ var _PartSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecipeSelect */ \"./front/src/app/OutputControl/RecipeSelect.js\");\n/* harmony import */ var _AmountInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AmountInput */ \"./front/src/app/OutputControl/AmountInput.js\");\n\n\n\n\nclass OutputControl {\n    partSearch = new _PartSearch__WEBPACK_IMPORTED_MODULE_0__.PartSearch()\n    recipe = new _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__.RecipeSelect()\n    amountInput = new _AmountInput__WEBPACK_IMPORTED_MODULE_2__.AmountInput()\n    constructor() {\n        this.amountInput.selectedPart = this.partSearch.search\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/OutputControl.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/PartSearch.js":
/*!***************************************************!*\
  !*** ./front/src/app/OutputControl/PartSearch.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PartSearch: () => (/* binding */ PartSearch),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bus */ \"./front/src/app/bus.js\");\n\n\nconst events = {\n    partSelected: 'part-selected'\n}\n\nclass PartSearch {\n    search = ''\n    searchInput = document.querySelector('#parts_input')\n\n    constructor() {\n        this.registerOnChange()\n    }\n\n    registerOnChange() {\n        this.searchInput.addEventListener('change', (event) => {\n            this.search = this.searchInput.value\n            _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.partSelected, this.search)\n        })\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/PartSearch.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/RecipeSelect.js":
/*!*****************************************************!*\
  !*** ./front/src/app/OutputControl/RecipeSelect.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RecipeSelect: () => (/* binding */ RecipeSelect),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../bus */ \"./front/src/app/bus.js\");\n/* harmony import */ var _PartSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n\n\n\n\nconst events = {\n    recipeChanged : 'recipe-changed'\n}\n\nclass RecipeSelect {\n    /** @type {?Recipe}*/\n    selectedRecipe = null\n    recipes = []\n    recipesSelect = document.querySelector('#recipe_select')\n    constructor() {\n        _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_PartSearch__WEBPACK_IMPORTED_MODULE_1__.events.partSelected, (part) => {\n            if (part === '') {\n                this.hide()\n                this.drop()\n            } else {\n                this.loadRecipes(part)\n            }\n        })\n        this.recipesSelect.addEventListener('change', (event) => {\n            this.selectedRecipe = this.recipesSelect.options[this.recipesSelect.selectedIndex].recipe\n            _bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.recipeChanged, this.selectedRecipe)\n        })\n    }\n\n    drop() {\n        this.recipes = []\n        this.recipesSelect.innerHTML = ''\n    }\n\n    hide() {\n        this.recipesSelect.style.display = 'none'\n    }\n\n    /**\n     * @param {string} part\n     */\n    loadRecipes(part) {\n        fetch('/find-recipe-by-product?product=' + part)\n            .then((response) => response.json())\n            .then((recipeList) => {\n                /** @type {Recipe[]} recipeList*/\n                this.setRecipes(recipeList)\n            })\n            .catch(error => {})\n    }\n\n    setRecipes(recipes) {\n        this.recipes = recipes\n        this.updateView()\n    }\n\n    updateView() {\n        this.recipesSelect.innerHTML = ''\n        if (this.recipes.length > 0) {\n            this.recipesSelect.style.display = 'block'\n            let emptyOpt = document.createElement('option')\n            emptyOpt.value = ''\n            emptyOpt.innerHTML = 'no recipe'\n            this.recipesSelect.appendChild(emptyOpt)\n            this.recipes.forEach((recipe, index) => {\n                let opt = document.createElement(\"option\")\n                opt.value = recipe.name\n                opt.innerHTML = recipe.displayName\n                opt.recipe = recipe\n                this.recipesSelect.appendChild(opt)\n            })\n        }\n    }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/RecipeSelect.js?");

/***/ }),

/***/ "./front/src/app/app.js":
/*!******************************!*\
  !*** ./front/src/app/app.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _OutputControl_OutputControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OutputControl/OutputControl */ \"./front/src/app/OutputControl/OutputControl.js\");\n/* harmony import */ var _GameData_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameData/GameData */ \"./front/src/app/GameData/GameData.js\");\n\n\n\nclass App {\n    // render = new Render()\n    // tree = new Tree()\n    // rootControl = new RootControl()\n    // total = new Total()\n    out = new _OutputControl_OutputControl__WEBPACK_IMPORTED_MODULE_0__.OutputControl()\n    gameData = new _GameData_GameData__WEBPACK_IMPORTED_MODULE_1__.GameData()\n\n\n    run() {\n\n\n        // this.render.rootNode = this.tree.root\n        //\n        // this.rootControl.init()\n        // EventBus.subscribe('node-created', (recipeNode) => {\n        //     this.render.createCell(recipeNode)\n        // })\n        // EventBus.subscribe('root-recipe-selected', (recipe) => {\n        //     this.tree.changeRoot(recipe)\n        // })\n    }\n}\n\n\n//# sourceURL=webpack://factory-calc/./front/src/app/app.js?");

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