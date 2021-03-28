/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_list_popup_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/list-popup-menu */ \"./src/modules/list-popup-menu.js\");\n/* harmony import */ var _modules_list_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/list-item */ \"./src/modules/list-item.js\");\n/* harmony import */ var _modules_todo_item_addition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/todo-item-addition */ \"./src/modules/todo-item-addition.js\");\n\n\n\n\ninit();\n\nfunction init() {\n  //Popup logic\n  _modules_list_popup_menu__WEBPACK_IMPORTED_MODULE_0__.default.openPopupWindow();\n  _modules_list_popup_menu__WEBPACK_IMPORTED_MODULE_0__.default.closePopupWindow();\n  _modules_list_popup_menu__WEBPACK_IMPORTED_MODULE_0__.default.addListItem();\n  //List item logic\n  _modules_list_item__WEBPACK_IMPORTED_MODULE_1__.default.listLogic();\n  //Todo item logic\n  _modules_todo_item_addition__WEBPACK_IMPORTED_MODULE_2__.default.todoItemPopupLogic();\n}\n\n//# sourceURL=webpack://todo-list-app/./src/index.js?");

/***/ }),

/***/ "./src/modules/list-item.js":
/*!**********************************!*\
  !*** ./src/modules/list-item.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/**\n * A List item is a list whoich holds to do items\n */\nconst createListItem = (() => {\n\n    const database = firebase.database();\n    const rootRef = database.ref('lists');\n\n    const listLogic = () => {\n        renderExistingLists();\n    }\n    \n    const addListToDatabase = (listName, listId) => {\n        rootRef.child(listId).set({\n            id: listId,\n            list_name: listName,\n         });\n    }\n\n    const deleteListFromDatabase = (listId) => {\n        rootRef.child(listId).remove();\n    }\n\n    const renderExistingLists = () => {\n        rootRef.once('value', snapshot => {\n            snapshot.forEach(element => {\n                let container = createListContainer(element.val()['list_name'], element.key);\n                appendListContainerToLists(container);\n\n                deleteList(container);\n            });\n        });\n    }\n\n    const allowListItemToBeActive = (listContainer) => {\n        let listTitleDiv = listContainer.querySelector('.list-title');\n        let listName = listTitleDiv.querySelector('span').innerHTML;\n        let currentListSelectedPreview = document.querySelector('#current-list')\n\n        listContainer.addEventListener('click', () => {\n            currentListSelectedPreview.textContent = listName;\n        })\n    } \n\n    const createListContainer = (listName, listId) => { \n        const listContainer = document.createElement('button');\n        listContainer.className = 'list-item';\n        const listTitle = document.createElement('span')\n        listTitle.innerHTML = listName\n        listContainer.id = listId;\n        let listTitleDiv = document.createElement('div');\n        listTitleDiv.className = 'list-title';\n\n        listTitleDiv.appendChild(listTitle);\n        listContainer.appendChild(listTitleDiv);\n\n        let deleteButtonDiv = document.createElement('div');\n        deleteButtonDiv.className = 'delete-button';\n        listContainer.appendChild(deleteButtonDiv);\n        let aWrapper = document.createElement('a');\n        let deleteIcon = document.createElement('img');\n        deleteIcon.src = '../dist/imgs/close-icon.png';\n        deleteIcon.className = 'delete-icon';\n        deleteIcon.id = 'delete-' + listName + '-list';\n        deleteButtonDiv.appendChild(deleteIcon);\n        deleteIcon.parentNode.insertBefore(aWrapper, deleteIcon);\n        listContainer.appendChild(deleteButtonDiv);\n\n        // Adding the functionality for it to be able to be selected and shown\n        allowListItemToBeActive(listContainer);\n\n        return listContainer\n    }\n\n    const appendListContainerToLists = (listContainer) => {\n        let lists = document.querySelector('.lists');\n        lists.appendChild(listContainer);\n    }\n\n    const deleteList = (listContainer) => {\n        let deleteButton = listContainer.childNodes[1];\n        deleteButton.addEventListener('click', () => {\n            listContainer.remove();\n            deleteListFromDatabase(listContainer.id);\n        })    \n    }\n\n    return {\n        listLogic,\n        createListContainer,\n        appendListContainerToLists,\n        addListToDatabase,\n        deleteList,\n        renderExistingLists,\n    }\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createListItem);\n\n\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/list-item.js?");

/***/ }),

/***/ "./src/modules/list-popup-menu.js":
/*!****************************************!*\
  !*** ./src/modules/list-popup-menu.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-item */ \"./src/modules/list-item.js\");\n\n\n/**\n * A pop up window for when creating a todo lists\n */\nconst PopupMenu = (() => {\n    \n    \n    //NEED TO ADD GSAP ANIMATIONS\n\n    let popupWindowOpen = false;\n    const listPopup = document.querySelector('.list-popup');\n    const popupInputBox = document.getElementById('list-name');\n    const database = firebase.database();\n    const rootRef = database.ref('/lists/');\n    \n\n    const openPopupWindow = () => {\n        let addButton = document.querySelector('.add-list-item');\n        addButton.addEventListener('click', () => {\n            listPopup.style.display = 'flex';\n        });\n        \n        popupWindowOpen = true;\n    }\n\n    const closePopupWindow = () => {\n        let cancelButton = document.querySelector('.cancel-list');\n        cancelButton.addEventListener('click', () => {\n            listPopup.style.display = 'none';\n        })\n\n        popupWindowOpen = false;\n    }\n\n    const addListItem = () => {\n        let addButton = document.querySelector('.add-list');\n        addButton.addEventListener('click', () => {\n            if (popupInputBox.value.length > 0) {  \n                const autoId = rootRef.push().key; // Creates distinct id's   \n                _list_item__WEBPACK_IMPORTED_MODULE_0__.default.addListToDatabase(popupInputBox.value, autoId);\n                let listContainer = _list_item__WEBPACK_IMPORTED_MODULE_0__.default.createListContainer(popupInputBox.value, autoId);\n                _list_item__WEBPACK_IMPORTED_MODULE_0__.default.appendListContainerToLists(listContainer);\n                _list_item__WEBPACK_IMPORTED_MODULE_0__.default.deleteList(listContainer);\n                popupInputBox.value = null;\n            }\n    \n            else if (popupInputBox.value.length < 1) {\n                popupInputBox.id = 'list-name-invalid';\n                setInterval(() => {popupInputBox.id = 'list-name'}, 800); // change class name back     \n            }\n        });  \n        \n    }\n\n    return {\n        openPopupWindow,\n        closePopupWindow,\n        addListItem,\n    }\n\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PopupMenu);\n\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/list-popup-menu.js?");

/***/ }),

/***/ "./src/modules/todo-item-addition.js":
/*!*******************************************!*\
  !*** ./src/modules/todo-item-addition.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-item.js */ \"./src/modules/todo-item.js\");\n\n\n/**\n * The logic for the add todo item button at the top\n */\n\nconst todoItemAddButton = (() => {\n\n    const popupClose = document.querySelector('.close-form');\n    const modalPopupMenu = document.querySelector('.modal-todo-item-form');\n    const addButton = document.querySelector('.add-todo-item');\n\n    const todoItemPopupLogic = () => {\n        addButton.addEventListener('click', () => {\n            modalPopupMenu.style.display = 'block';\n        });\n\n        popupClose.addEventListener('click', () => {\n            modalPopupMenu.style.display = 'none';\n        });\n\n        window.addEventListener('click', (event) => {\n            if (event.target == modalPopupMenu) {\n                modalPopupMenu.style.display = 'none';\n            }\n        })\n    }\n\n    return {\n        todoItemPopupLogic,\n    }\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (todoItemAddButton);\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/todo-item-addition.js?");

/***/ }),

/***/ "./src/modules/todo-item.js":
/*!**********************************!*\
  !*** ./src/modules/todo-item.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/**\n * This is a todo item within a particular list\n */\n\nconst todoItemDataBaseFunctions = ( () => {\n    const database = firebase.database();\n    const rootRef = database.ref('todo-items');\n\n    const addTodoItemsToDb = (itemDescription, itemId, dueDate, parentList) => {\n        rootRef.child(itemId).set({\n            id: itemId,\n            item_description: itemDescription,\n            due_date: dueDate,\n            parent_list: parentList,\n        });\n    }\n\n    return {\n        addTodoItemsToDb,\n    }\n})();\n\n\nconst createTodoItem = (() => {\n\n    const TodoItemObjectLogic = () => {\n        let container = createTodoItemContainer();\n        addTodoItemToBoard(container);\n    }\n\n\n    const createTodoItemContainer = () => {\n        const container = document.createElement('div');\n        container.setAttribute('class', 'todo-item');\n\n        const radioButton = document.createElement('input');\n        radioButton.type = 'radio';\n\n        container.appendChild(radioButton);\n\n        return container;\n    }\n\n    const addTodoItemToBoard = (todoItemContainer) => {\n        let todoItemBoard = document.querySelector('.todo-items-board');\n        todoItemBoard.appendChild(todoItemContainer);\n    }\n\n    return {\n        TodoItemObjectLogic,\n    }\n\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTodoItem);\n\n//# sourceURL=webpack://todo-list-app/./src/modules/todo-item.js?");

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;