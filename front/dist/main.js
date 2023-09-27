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

/***/ "./front/src/app/App.js":
/*!******************************!*\
  !*** ./front/src/app/App.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _OutputControl_OutputControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OutputControl/OutputControl */ \"./front/src/app/OutputControl/OutputControl.js\");\n/* harmony import */ var _GameData_GameData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameData/GameData */ \"./front/src/app/GameData/GameData.js\");\n/* harmony import */ var _Tree_Tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tree/Tree */ \"./front/src/app/Tree/Tree.js\");\n\n\n\nclass App {\n  tree = new _Tree_Tree__WEBPACK_IMPORTED_MODULE_2__.Tree();\n  out = new _OutputControl_OutputControl__WEBPACK_IMPORTED_MODULE_0__.OutputControl();\n  gameData = new _GameData_GameData__WEBPACK_IMPORTED_MODULE_1__.GameData();\n  run() {}\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/App.js?");

/***/ }),

/***/ "./front/src/app/Bus.js":
/*!******************************!*\
  !*** ./front/src/app/Bus.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventBus: () => (/* binding */ EventBus)\n/* harmony export */ });\nclass EventBus {\n  static events = [];\n  static publish(name) {\n    const callbackList = this.events[name];\n    if (!callbackList) return console.warn(name + \" not found!\");\n    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n    for (let callback of callbackList) {\n      callback(...args);\n    }\n  }\n  static subscribe(name, callback) {\n    if (!this.events[name]) {\n      this.events[name] = [];\n    }\n    this.events[name].push(callback);\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Bus.js?");

/***/ }),

/***/ "./front/src/app/GameData/GameData.js":
/*!********************************************!*\
  !*** ./front/src/app/GameData/GameData.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameData: () => (/* binding */ GameData)\n/* harmony export */ });\n/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Option */ \"./front/src/app/GameData/Option.js\");\n\nclass GameData {\n  /** @type {Option[]}*/\n  parts = [];\n  recipes = [];\n  datalistHtml = document.querySelector('#parts');\n  constructor() {\n    window.addEventListener('load', () => {\n      this.loadParts().then(() => this.updateView());\n    });\n  }\n  loadParts() {\n    return new Promise((resolve, reject) => {\n      fetch(\"/resource-name-list\").then(response => response.json()).then(list => {\n        /** @type {Option[]} list */\n        for (let i = 0; i < list.length; i++) {\n          this.parts.push(list[i]);\n        }\n        resolve();\n      }).catch(() => {});\n    });\n  }\n  updateView() {\n    this.datalistHtml.innerHTML = '';\n    for (let i = 0; i < this.parts.length; i++) {\n      let newOption = document.createElement(\"option\");\n      newOption.value = this.parts[i].name;\n      newOption.innerHTML = this.parts[i].displayName;\n      this.datalistHtml.appendChild(newOption);\n    }\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/GameData.js?");

/***/ }),

/***/ "./front/src/app/GameData/Option.js":
/*!******************************************!*\
  !*** ./front/src/app/GameData/Option.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Option: () => (/* binding */ Option)\n/* harmony export */ });\nclass Option {\n  name;\n  displayName;\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/Option.js?");

/***/ }),

/***/ "./front/src/app/GameData/Part.js":
/*!****************************************!*\
  !*** ./front/src/app/GameData/Part.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Part: () => (/* binding */ Part)\n/* harmony export */ });\nclass Part {\n  name;\n  amount;\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/Part.js?");

/***/ }),

/***/ "./front/src/app/GameData/Recipe.js":
/*!******************************************!*\
  !*** ./front/src/app/GameData/Recipe.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Recipe: () => (/* binding */ Recipe)\n/* harmony export */ });\n/* harmony import */ var _Part__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Part */ \"./front/src/app/GameData/Part.js\");\n\nclass Recipe {\n  name = '';\n  displayName = '';\n  /** @type {Part[]} */\n  ingredients = [];\n  /** @type {Part[]} */\n  products = [];\n  manufactoringDuration = 1;\n  producedIn = '';\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/GameData/Recipe.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/AmountInput.js":
/*!****************************************************!*\
  !*** ./front/src/app/OutputControl/AmountInput.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AmountInput: () => (/* binding */ AmountInput),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _Bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Bus */ \"./front/src/app/Bus.js\");\n/* harmony import */ var _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecipeSelect */ \"./front/src/app/OutputControl/RecipeSelect.js\");\n/* harmony import */ var _PartSearch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n/* harmony import */ var _GameData_Part__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GameData/Part */ \"./front/src/app/GameData/Part.js\");\n\n\n\n\n\n\nconst events = {\n  amountChanged: 'amount-changed'\n};\nclass AmountInput {\n  /** @type {?PartSearch} */\n  partSearch = null;\n  amount = 0;\n  view = new View(this);\n  constructor() {\n    _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_RecipeSelect__WEBPACK_IMPORTED_MODULE_1__.events.recipeChanged, recipe => this.handleRecipeChanged(recipe));\n    _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_PartSearch__WEBPACK_IMPORTED_MODULE_2__.events.partChanged, () => this.handlePartChanged());\n  }\n  handlePartChanged() {\n    this.view.hide();\n    this.setAmount(0);\n  }\n  setAmount(amount) {\n    this.amount = amount;\n    this.view.update();\n    _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.amountChanged, this.amount);\n  }\n\n  /**\n   * @param {?Recipe} recipe\n   */\n  handleRecipeChanged(recipe) {\n    if (recipe === null) {\n      this.view.hide();\n      this.setAmount(0);\n    } else {\n      let part = this.findWantedPartByRecipe(recipe);\n      this.setAmount(60 / recipe.manufactoringDuration * part.amount);\n      this.view.show();\n    }\n  }\n\n  /**\n   * @param {Recipe} recipe\n   * @return {?Part}\n   */\n  findWantedPartByRecipe(recipe) {\n    return recipe.products.find(part => part.name === this.partSearch.search, null);\n  }\n}\nclass View {\n  amountBlock = document.querySelector('#amount');\n  amountInput = document.querySelector('#amount_input');\n  constructor(model) {\n    this.hide();\n    this.model = model;\n    this.amountInput.addEventListener('change', () => {\n      this.model.setAmount(this.amountInput.value);\n    });\n  }\n  update() {\n    this.amountInput.value = this.model.amount;\n  }\n  hide() {\n    this.amountBlock.classList.remove('shown');\n    this.amountBlock.classList.add('hidden');\n  }\n  show() {\n    this.amountBlock.classList.remove('hidden');\n    this.amountBlock.classList.add('shown');\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/AmountInput.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/OutputControl.js":
/*!******************************************************!*\
  !*** ./front/src/app/OutputControl/OutputControl.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OutputControl: () => (/* binding */ OutputControl)\n/* harmony export */ });\n/* harmony import */ var _PartSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecipeSelect */ \"./front/src/app/OutputControl/RecipeSelect.js\");\n/* harmony import */ var _AmountInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AmountInput */ \"./front/src/app/OutputControl/AmountInput.js\");\n\n\n\nclass OutputControl {\n  partSearch = new _PartSearch__WEBPACK_IMPORTED_MODULE_0__.PartSearch();\n  recipe = new _RecipeSelect__WEBPACK_IMPORTED_MODULE_1__.RecipeSelect();\n  amountInput = new _AmountInput__WEBPACK_IMPORTED_MODULE_2__.AmountInput();\n  constructor() {\n    this.amountInput.partSearch = this.partSearch;\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/OutputControl.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/PartSearch.js":
/*!***************************************************!*\
  !*** ./front/src/app/OutputControl/PartSearch.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PartSearch: () => (/* binding */ PartSearch),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _Bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Bus */ \"./front/src/app/Bus.js\");\n\nconst events = {\n  partChanged: 'part-changed'\n};\nclass PartSearch {\n  search = '';\n  searchInput = document.querySelector('#parts_input');\n  constructor() {\n    this.registerOnChange();\n  }\n  registerOnChange() {\n    this.searchInput.addEventListener('change', event => {\n      this.search = this.searchInput.value;\n      _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.partChanged, this.search);\n    });\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/PartSearch.js?");

/***/ }),

/***/ "./front/src/app/OutputControl/RecipeSelect.js":
/*!*****************************************************!*\
  !*** ./front/src/app/OutputControl/RecipeSelect.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RecipeSelect: () => (/* binding */ RecipeSelect),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _Bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Bus */ \"./front/src/app/Bus.js\");\n/* harmony import */ var _PartSearch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n\n\n\nconst events = {\n  recipeChanged: 'recipe-changed'\n};\nclass RecipeSelect {\n  /** @type {?Recipe}*/\n  selectedRecipe = null;\n  recipes = [];\n  recipesSelect = document.querySelector('#recipe_select');\n  constructor() {\n    _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_PartSearch__WEBPACK_IMPORTED_MODULE_1__.events.partChanged, part => {\n      if (part === '') {\n        this.hide();\n        this.drop();\n      } else {\n        this.loadRecipes(part);\n      }\n    });\n    this.recipesSelect.addEventListener('change', event => {\n      this.selectedRecipe = this.recipesSelect.options[this.recipesSelect.selectedIndex].recipe;\n      _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.recipeChanged, this.selectedRecipe);\n    });\n  }\n  drop() {\n    this.recipes = [];\n    this.recipesSelect.innerHTML = '';\n  }\n  hide() {\n    this.recipesSelect.style.display = 'none';\n  }\n\n  /**\n   * @param {string} part\n   */\n  loadRecipes(part) {\n    fetch('/find-recipe-by-product?product=' + part).then(response => response.json()).then(recipeList => {\n      /** @type {Recipe[]} recipeList*/\n      let recipes = this.convertToListOfRecipes(recipeList);\n      this.setRecipes(recipes);\n    }).catch(error => {\n      this.hide();\n      this.drop();\n    });\n  }\n\n  /**\n   * @param {object[]} objects\n   */\n  convertToListOfRecipes(objects) {\n    let list = [];\n    objects.forEach(obj => {\n      const recipe = Object.assign(new _GameData_Recipe__WEBPACK_IMPORTED_MODULE_2__.Recipe(), obj);\n      list.push(recipe);\n    });\n    return list;\n  }\n  setRecipes(recipes) {\n    this.recipes = recipes;\n    this.updateView();\n  }\n  updateView() {\n    this.recipesSelect.innerHTML = '';\n    if (this.recipes.length > 0) {\n      this.recipesSelect.style.display = 'block';\n      let emptyOpt = document.createElement('option');\n      emptyOpt.value = '';\n      emptyOpt.innerHTML = 'no recipe';\n      emptyOpt.recipe = null;\n      this.recipesSelect.appendChild(emptyOpt);\n      this.recipes.forEach((recipe, index) => {\n        let opt = document.createElement(\"option\");\n        opt.value = recipe.name;\n        opt.innerHTML = recipe.displayName;\n        opt.recipe = recipe;\n        this.recipesSelect.appendChild(opt);\n      });\n    }\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/OutputControl/RecipeSelect.js?");

/***/ }),

/***/ "./front/src/app/Tree/Node/Ingredient.js":
/*!***********************************************!*\
  !*** ./front/src/app/Tree/Node/Ingredient.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ingredient: () => (/* binding */ Ingredient),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _GameData_Part__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../GameData/Part */ \"./front/src/app/GameData/Part.js\");\n/* harmony import */ var _RecipeNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecipeNode */ \"./front/src/app/Tree/Node/RecipeNode.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n/* harmony import */ var _Bus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Bus */ \"./front/src/app/Bus.js\");\n\n\n\n\nconst events = {\n  connectedNodeChanged: 'connected-node-changed'\n};\nclass Ingredient {\n  name;\n  amount;\n  /** @type {RecipeNode}*/\n  parentRecipeNode = null;\n  /** @type {?RecipeNode}*/\n  connectedRecipeNode = null;\n  constructor(name, amount, parentRecipeNode) {\n    this.name = name;\n    this.amount = amount;\n    this.parentRecipeNode = parentRecipeNode;\n  }\n\n  /**\n   * @param {?Recipe} recipe\n   */\n  setConnectedRecipeNode(recipe) {\n    if (this.connectedRecipeNode !== null) {\n      this.connectedRecipeNode.drop(false);\n    }\n    if (recipe !== null) {\n      this.connectedRecipeNode = new _RecipeNode__WEBPACK_IMPORTED_MODULE_1__.RecipeNode(recipe);\n    }\n    _Bus__WEBPACK_IMPORTED_MODULE_3__.EventBus.publish(events.connectedNodeChanged);\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Node/Ingredient.js?");

/***/ }),

/***/ "./front/src/app/Tree/Node/NodeControl/NodeControl.js":
/*!************************************************************!*\
  !*** ./front/src/app/Tree/Node/NodeControl/NodeControl.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NodeControl: () => (/* binding */ NodeControl),\n/* harmony export */   className: () => (/* binding */ className)\n/* harmony export */ });\n/* harmony import */ var _Bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Bus */ \"./front/src/app/Bus.js\");\n/* harmony import */ var _RecipeNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../RecipeNode */ \"./front/src/app/Tree/Node/RecipeNode.js\");\n/* harmony import */ var _RecipeSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RecipeSelect */ \"./front/src/app/Tree/Node/NodeControl/RecipeSelect.js\");\n\n\n\nconst className = 'selected-node-control';\nclass NodeControl {\n  node;\n  view;\n  constructor(recipeNode) {\n    this.node = recipeNode;\n    this.view = new View(this);\n    this.recipeSelectors = recipeNode.recipe.ingredients.map(part => new _RecipeSelect__WEBPACK_IMPORTED_MODULE_2__.RecipeSelect(part, this.view.div, this));\n    _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.subscribe(_RecipeNode__WEBPACK_IMPORTED_MODULE_1__.events.clicked, node => {\n      this.handleNodeClick(node);\n    });\n  }\n  handleNodeClick(node) {\n    if (node !== this.node) {\n      this.hide();\n    } else {\n      this.show();\n    }\n  }\n  hide() {\n    this.view.hide();\n  }\n  show() {\n    this.view.show();\n  }\n  drop() {\n    this.view.drop();\n  }\n}\nclass View {\n  div = document.createElement('div');\n  constructor(model) {\n    this.model = model;\n    this.div.classList.add(className);\n    this.hide();\n    let leftPanel = document.querySelector('#left-panel');\n    leftPanel.appendChild(this.div);\n\n    // this.model.recipe.ingredients.forEach((ingredient) => {\n    //     this.createIngredientRecipeSelector(ingredient, nodeControl)\n    // })\n  }\n\n  hide() {\n    this.div.classList.remove('shown');\n    this.div.classList.add('hidden');\n  }\n  show() {\n    this.div.classList.remove('hidden');\n    this.div.classList.add('shown');\n  }\n  drop() {\n    this.div.remove();\n  }\n\n  /**\n   * @param {Part} ingredient\n   * @param {HTMLElement} nodeControl\n   */\n  createIngredientRecipeSelector(ingredient, nodeControl) {\n    let ingredientDiv = document.createElement('div');\n    let image = document.createElement('img');\n    let select = document.createElement('select');\n    // select.addEventListener('change', (event) => {\n    //     let recipeNode = nodeControl.cell.recipeNode\n    //     let newNode = new RecipeNode(event.target.options[event.target.selectedIndex].recipe)\n    //     newNode.mainProduct = ingredient.name\n    //     recipeNode.addIngredientRecipe(newNode)\n    //     // add to total\n    // })\n    let emptyOption = document.createElement('option');\n    emptyOption.value = '';\n    emptyOption.innerHTML = 'no recipe';\n    select.appendChild(emptyOption);\n    nodeControl.appendChild(ingredientDiv);\n    ingredientDiv.appendChild(image);\n    ingredientDiv.appendChild(select);\n    /** @param {Recipe[]} recipes */\n    let fillSelect = recipes => {\n      recipes.forEach(recipe => {\n        let newOpt = document.createElement('option');\n        newOpt.value = recipe.name;\n        newOpt.recipe = recipe;\n        newOpt.innerHTML = recipe.displayName;\n        select.appendChild(newOpt);\n      });\n    };\n    fetch('/find-recipe-by-product?product=' + ingredient.name).then(resp => resp.json()).then(json => fillSelect(json)).catch(() => {});\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Node/NodeControl/NodeControl.js?");

/***/ }),

/***/ "./front/src/app/Tree/Node/NodeControl/RecipeSelect.js":
/*!*************************************************************!*\
  !*** ./front/src/app/Tree/Node/NodeControl/RecipeSelect.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RecipeSelect: () => (/* binding */ RecipeSelect)\n/* harmony export */ });\n/* harmony import */ var _GameData_Part__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../GameData/Part */ \"./front/src/app/GameData/Part.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n/* harmony import */ var _Bus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Bus */ \"./front/src/app/Bus.js\");\n/* harmony import */ var _NodeControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NodeControl */ \"./front/src/app/Tree/Node/NodeControl/NodeControl.js\");\n\n\n\n\nclass RecipeSelect {\n  /**\n   * @type {View}\n   */\n  view;\n  /**\n   * @type {Part}\n   */\n  part;\n  /** @type {Recipe[]} */\n  recipes = [];\n  /** @type {?Recipe} */\n  selectedRecipe;\n  /**\n   * @type {NodeControl}\n   */\n  parent;\n\n  /**\n   * @param {Part} part\n   * @param controlDiv\n   * @param {NodeControl} parent\n   */\n  constructor(part, controlDiv, parent) {\n    this.part = part;\n    this.parent = parent;\n    this.view = new View(this, controlDiv);\n    this.fillOptions();\n    this.listenChanges();\n  }\n  listenChanges() {\n    this.view.select.addEventListener('change', () => {\n      this.selectedRecipe = this.recipes.find(recipe => this.view.select.value = recipe.name, null);\n      this.parent.node.setRecipeForIngredient(this.part, this.selectedRecipe);\n    });\n  }\n  fillOptions() {\n    fetch('/find-recipe-by-product?product=' + this.part.name).then(response => response.json()).then(recipeList => {\n      /** @type {Recipe[]} recipeList*/\n      this.setRecipes(this.convertToListOfRecipes(recipeList));\n    }).catch(error => {\n      console.log(error);\n    });\n  }\n  setRecipes(recipes) {\n    this.recipes = recipes;\n    this.view.update();\n  }\n\n  /**\n   * @param {object[]} objects\n   */\n  convertToListOfRecipes(objects) {\n    let list = [];\n    objects.forEach(obj => {\n      const recipe = Object.assign(new _GameData_Recipe__WEBPACK_IMPORTED_MODULE_1__.Recipe(), obj);\n      list.push(recipe);\n    });\n    return list;\n  }\n}\nclass View {\n  select;\n  outerDiv;\n  model;\n  /**\n   * @param {RecipeSelect} model\n   * @param {HTMLElement} controlDiv\n   */\n  constructor(model, controlDiv) {\n    this.model = model;\n    this.select = document.createElement('select');\n    this.outerDiv = document.createElement('div');\n    controlDiv.appendChild(this.outerDiv);\n    this.outerDiv.appendChild(this.select);\n  }\n  update() {\n    this.select.innerHTML = '';\n    this.createOptions();\n  }\n  createOption(value, innerHTML) {\n    let option = document.createElement('option');\n    option.value = value;\n    option.innerHTML = innerHTML;\n    return option;\n  }\n  createOptions() {\n    let empty = this.createOption('', 'no recipe');\n    this.select.appendChild(empty);\n    this.model.recipes.forEach(r => {\n      /**\n       * @type {Recipe} recipe\n       */\n      let recipe = r;\n      let newOpt = this.createOption(recipe.name, recipe.displayName);\n      this.select.appendChild(newOpt);\n    });\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Node/NodeControl/RecipeSelect.js?");

/***/ }),

/***/ "./front/src/app/Tree/Node/Position.js":
/*!*********************************************!*\
  !*** ./front/src/app/Tree/Node/Position.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Position: () => (/* binding */ Position)\n/* harmony export */ });\nclass Position {\n  constructor() {\n    let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    let y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    this.x = x;\n    this.y = y;\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Node/Position.js?");

/***/ }),

/***/ "./front/src/app/Tree/Node/RecipeNode.js":
/*!***********************************************!*\
  !*** ./front/src/app/Tree/Node/RecipeNode.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RecipeNode: () => (/* binding */ RecipeNode),\n/* harmony export */   events: () => (/* binding */ events)\n/* harmony export */ });\n/* harmony import */ var _Bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Bus */ \"./front/src/app/Bus.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n/* harmony import */ var _Ingredient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ingredient */ \"./front/src/app/Tree/Node/Ingredient.js\");\n/* harmony import */ var _GameData_Part__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../GameData/Part */ \"./front/src/app/GameData/Part.js\");\n/* harmony import */ var _NodeControl_NodeControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NodeControl/NodeControl */ \"./front/src/app/Tree/Node/NodeControl/NodeControl.js\");\n/* harmony import */ var _NodeControl_RecipeSelect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NodeControl/RecipeSelect */ \"./front/src/app/Tree/Node/NodeControl/RecipeSelect.js\");\n\n\n\n\n\n\nconst events = {\n  created: 'node-created',\n  dropped: 'node-dropped',\n  clicked: 'node-clicked'\n};\nclass RecipeNode {\n  /** @type {Recipe} */\n  recipe;\n  /** @type {number} */\n  multiplier = 1.0;\n  size = 1;\n  /** @type {View} */\n  view;\n  /** @type {Ingredient[]} */\n  ingredients = [];\n  nodeControl;\n  /** @type {?Ingredient} */\n  parentIngredient = null;\n\n  /**\n   * @param {Recipe} recipe\n   */\n  constructor(recipe) {\n    this.recipe = recipe;\n    this.view = new View(this);\n    this.nodeControl = new _NodeControl_NodeControl__WEBPACK_IMPORTED_MODULE_4__.NodeControl(this);\n    this.createIngredients();\n    _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.created, this);\n  }\n  createIngredients() {\n    this.recipe.ingredients.forEach(ingredient => {\n      this.ingredients.push(new _Ingredient__WEBPACK_IMPORTED_MODULE_2__.Ingredient(ingredient.name, ingredient.amount, this));\n    });\n  }\n\n  /**\n   *\n   * @param {Part} part\n   * @param {?Recipe} recipe\n   */\n  setRecipeForIngredient(part, recipe) {\n    console.log('setRecipeForIngredient');\n    console.log(this.ingredients);\n    console.log(part);\n    let nodeIngredient = this.ingredients.find(node => node.name === part.name);\n    if (recipe !== null) {\n      nodeIngredient.setConnectedRecipeNode(recipe);\n    } else {\n      nodeIngredient.setConnectedRecipeNode(null);\n    }\n  }\n\n  /**\n   * @param {number} left\n   * @param {number} top\n   */\n  setPos(left, top) {\n    this.view.setPos(left, top);\n  }\n  dropNodeControl() {\n    this.nodeControl.drop();\n    this.nodeControl = null;\n  }\n  dropView() {\n    this.view.drop();\n    this.view = null;\n  }\n\n  /**\n   * @param {Ingredient} ingredient\n   */\n  dropChildNode(ingredient) {\n    ingredient.connectedRecipeNode.drop(false);\n    ingredient.connectedRecipeNode = null;\n  }\n  drop() {\n    let sendEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n    this.dropNodeControl();\n    this.dropView();\n    // drop children recursively\n    this.ingredients.forEach(ingredient => {\n      if (ingredient.connectedRecipeNode instanceof RecipeNode) {\n        this.dropChildNode(ingredient);\n      }\n    });\n    if (sendEvent) {\n      _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.dropped);\n    }\n  }\n\n  /**\n   * @return {Ingredient[]}\n   */\n  getIngredientsWithConnectedNodes() {\n    let result = [];\n    for (let i = 0; i < this.ingredients.length; i++) {\n      if (this.ingredients[i].connectedRecipeNode !== null) {\n        result.push(this.ingredients[i]);\n      }\n    }\n    return result;\n  }\n  updateSizeRecursive() {\n    this.size = 0;\n    let ingredients = this.getIngredientsWithConnectedNodes();\n    if (ingredients.length === 0) {\n      this.size = 1;\n    } else {\n      for (let i = 0; i < ingredients.length; i++) {\n        this.size += ingredients[i].connectedRecipeNode.size;\n      }\n    }\n    if (this.parentIngredient !== null) {\n      this.parentIngredient.parentRecipeNode.updateSizeRecursive();\n    }\n  }\n}\nclass View {\n  divNode = document.createElement(\"div\");\n  constructor(model) {\n    this.node = model;\n    this.createCell();\n  }\n  drop() {\n    this.divNode.remove();\n  }\n  createCell() {\n    let gridDiv = document.querySelector(\"#grid\");\n    this.divNode.classList.add(\"cell\");\n    let leftDiv = document.createElement('div');\n    leftDiv.classList.add(\"left\");\n    let rightDiv = document.createElement('div');\n    rightDiv.classList.add(\"right\");\n    this.divNode.appendChild(leftDiv);\n    this.divNode.appendChild(rightDiv);\n    this.createIngredientDivs(rightDiv);\n    let factoryImage = document.createElement('img');\n    factoryImage.src = '/static/images/Assembler.png';\n    leftDiv.appendChild(factoryImage);\n    let factoryCount = document.createElement('div');\n    factoryCount.innerHTML = 'x' + this.node.multiplier;\n    leftDiv.appendChild(factoryCount);\n    gridDiv.appendChild(this.divNode);\n    this.divNode.addEventListener('click', event => {\n      _Bus__WEBPACK_IMPORTED_MODULE_0__.EventBus.publish(events.clicked, this.node);\n    });\n  }\n\n  /**\n   * @param {HTMLElement} rightDiv\n   */\n  createIngredientDivs(rightDiv) {\n    this.node.recipe.ingredients.forEach(ingredient => {\n      let ingredientDiv = document.createElement('div');\n      ingredientDiv.classList.add('ingredient');\n      let w = 100;\n      let h = 100;\n      let len = this.node.recipe.ingredients.length;\n      if (len === 2) {\n        w = 50;\n      }\n      if (len === 3 || len === 4) {\n        w = 50;\n        h = 50;\n      }\n      ingredientDiv.style.width = w + '%';\n      ingredientDiv.style.height = h + '%';\n      let image = document.createElement('img');\n      image.src = '/static/images/Assembler.png';\n      image.classList.add('image');\n      let countDiv = document.createElement('div');\n      countDiv.classList.add('count');\n      countDiv.style.fontSize = len === 1 ? \"1em\" : \"0.5em\";\n      countDiv.innerHTML = ingredient.amount + '/m';\n      ingredientDiv.appendChild(image);\n      ingredientDiv.appendChild(countDiv);\n      rightDiv.appendChild(ingredientDiv);\n    });\n  }\n\n  /**\n   * @param {number} left\n   * @param {number} top\n   */\n  setPos(left, top) {\n    this.divNode.style.left = left + \"em\";\n    this.divNode.style.top = top + \"em\";\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Node/RecipeNode.js?");

/***/ }),

/***/ "./front/src/app/Tree/Tree.js":
/*!************************************!*\
  !*** ./front/src/app/Tree/Tree.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tree: () => (/* binding */ Tree),\n/* harmony export */   height: () => (/* binding */ height),\n/* harmony export */   width: () => (/* binding */ width)\n/* harmony export */ });\n/* harmony import */ var _Node_RecipeNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node/RecipeNode */ \"./front/src/app/Tree/Node/RecipeNode.js\");\n/* harmony import */ var _Bus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Bus */ \"./front/src/app/Bus.js\");\n/* harmony import */ var _OutputControl_RecipeSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../OutputControl/RecipeSelect */ \"./front/src/app/OutputControl/RecipeSelect.js\");\n/* harmony import */ var _OutputControl_PartSearch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../OutputControl/PartSearch */ \"./front/src/app/OutputControl/PartSearch.js\");\n/* harmony import */ var _Node_Position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Node/Position */ \"./front/src/app/Tree/Node/Position.js\");\n/* harmony import */ var _GameData_Recipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GameData/Recipe */ \"./front/src/app/GameData/Recipe.js\");\n/* harmony import */ var _Node_Ingredient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Node/Ingredient */ \"./front/src/app/Tree/Node/Ingredient.js\");\n\n\n\n\n\n\n\n\nclass Tree {\n  /** @type ?RecipeNode */\n  root = null;\n  view = new View(this);\n  constructor() {\n    _Bus__WEBPACK_IMPORTED_MODULE_1__.EventBus.subscribe(_OutputControl_RecipeSelect__WEBPACK_IMPORTED_MODULE_2__.events.recipeChanged, recipe => this.handleRecipeChanged(recipe));\n    _Bus__WEBPACK_IMPORTED_MODULE_1__.EventBus.subscribe(_OutputControl_PartSearch__WEBPACK_IMPORTED_MODULE_3__.events.partChanged, () => this.handlePartSearchChanged());\n    // EventBus.subscribe(nodeEvents.dropped, () => this.handleNodeDropped())\n    // EventBus.subscribe(nodeEvents.created, () => this.handleNodeCreated())\n    _Bus__WEBPACK_IMPORTED_MODULE_1__.EventBus.subscribe(_Node_Ingredient__WEBPACK_IMPORTED_MODULE_6__.events.connectedNodeChanged, () => this.handleNodeCreated());\n  }\n  handleNodeDropped() {\n    this.view.updatePositions();\n  }\n  handleNodeCreated() {\n    this.view.updatePositions();\n  }\n  handlePartSearchChanged() {\n    if (this.root instanceof _Node_RecipeNode__WEBPACK_IMPORTED_MODULE_0__.RecipeNode) {\n      this.root.drop();\n    }\n  }\n  handleRecipeChanged(recipe) {\n    if (this.root instanceof _Node_RecipeNode__WEBPACK_IMPORTED_MODULE_0__.RecipeNode) {\n      this.root.drop();\n      this.setRoot(null);\n    }\n    if (recipe instanceof _GameData_Recipe__WEBPACK_IMPORTED_MODULE_5__.Recipe) {\n      this.setRoot(new _Node_RecipeNode__WEBPACK_IMPORTED_MODULE_0__.RecipeNode(recipe));\n    }\n  }\n\n  /**\n   * @param {?RecipeNode} recipeNode\n   */\n  setRoot(recipeNode) {\n    this.root = recipeNode;\n  }\n}\nconst width = 10;\nconst height = 5;\nclass View {\n  constructor(model) {\n    this.model = model;\n  }\n\n  /**\n   *\n   * @param {?RecipeNode} recipeNode\n   * @param {Position} pos\n   * @param {number} deepLevel\n   */\n  updatePositions() {\n    let recipeNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.model.root;\n    let pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Node_Position__WEBPACK_IMPORTED_MODULE_4__.Position(0, 0);\n    let deepLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n    console.log('updatePositions');\n    // console.log(recipeNode)\n    // console.log(pos)\n    // console.log(deepLevel)\n    if (recipeNode === null) {\n      return;\n    }\n    recipeNode.setPos(pos.x * width + deepLevel, pos.y * height);\n    deepLevel++;\n    let ingredients = recipeNode.getIngredientsWithConnectedNodes();\n    console.log(ingredients);\n    console.log(ingredients.length);\n    console.log(recipeNode.ingredients);\n    console.log(recipeNode.ingredients.length);\n    for (let i = 0; i < ingredients.length; i++) {\n      let y = pos.y + i;\n      if (i > 0) {\n        y = pos.y + i + (ingredients[i - 1].connectedRecipeNode.size - 1);\n      }\n      this.updatePositions(ingredients[i].connectedRecipeNode, new _Node_Position__WEBPACK_IMPORTED_MODULE_4__.Position(pos.x + 1, y), deepLevel);\n    }\n  }\n}\n\n//# sourceURL=webpack://factory-calc/./front/src/app/Tree/Tree.js?");

/***/ }),

/***/ "./front/src/main.js":
/*!***************************!*\
  !*** ./front/src/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/App */ \"./front/src/app/App.js\");\n\n// import { createRoot } from 'react-dom/client';\n// import React from 'react';\n// import Button from '@mui/material/Button';\n// import {App2} from './App'\n\n// const root = createRoot(document.getElementById('app'));\n// root.render(<App2 />)\n\nnew _app_App__WEBPACK_IMPORTED_MODULE_0__.App().run();\n\n//# sourceURL=webpack://factory-calc/./front/src/main.js?");

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