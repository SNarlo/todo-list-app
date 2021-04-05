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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_list_popup_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/list-popup-menu */ \"./src/modules/list-popup-menu.js\");\n/* harmony import */ var _modules_list_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/list-item */ \"./src/modules/list-item.js\");\n/* harmony import */ var _modules_todo_item_addition_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/todo-item-addition-button */ \"./src/modules/todo-item-addition-button.js\");\n/* harmony import */ var _modules_todo_item_popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/todo-item-popup */ \"./src/modules/todo-item-popup.js\");\n/* harmony import */ var _modules_todo_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/todo-item */ \"./src/modules/todo-item.js\");\n\n\n\n\n\n\n\ninit();\n\nfunction init() {\n  //Popup logic\n  _modules_list_popup_menu__WEBPACK_IMPORTED_MODULE_0__.default.openPopupWindow();\n  _modules_list_popup_menu__WEBPACK_IMPORTED_MODULE_0__.default.closePopupWindow();\n  _modules_list_popup_menu__WEBPACK_IMPORTED_MODULE_0__.default.addListItem();\n  //List item logic\n  _modules_list_item__WEBPACK_IMPORTED_MODULE_1__.default.listLogic();\n  _modules_list_item__WEBPACK_IMPORTED_MODULE_1__.default.createGeneralList();\n  //Todo item logic\n  _modules_todo_item_addition_button__WEBPACK_IMPORTED_MODULE_2__.default.todoItemPopupLogic();\n  _modules_todo_item_popup__WEBPACK_IMPORTED_MODULE_3__.default.submitForm();\n  _modules_todo_item__WEBPACK_IMPORTED_MODULE_4__.default.renderTodoItemsToBoardFromDB('all-items-list');\n  \n}\n\n//# sourceURL=webpack://todo-list-app/./src/index.js?");

/***/ }),

/***/ "./src/modules/list-item.js":
/*!**********************************!*\
  !*** ./src/modules/list-item.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-item */ \"./src/modules/todo-item.js\");\n\n\n/**\n * A List item is a list whoich holds to do items\n */\nconst listItemLogic = (() => {\n\n    const database = firebase.database();\n    const rootRef = database.ref('lists');\n    let activeList = \"all-items-list\";\n\n\n    const listLogic = () => {\n        renderExistingLists();\n    }\n\n    const createGeneralList = () => {\n        let container = createListContainer('All Items', 'all-items-list');\n        let deleteButton = container.querySelector('.delete-button');\n        deleteButton.remove();\n        addListToDatabase('All Items', 'all-items-list');\n        allowListItemToBeActive(container);\n    }\n    \n    const changeActiveList = (listId) => {\n        let list = document.getElementById(listId);\n        list.addEventListener('click', () => {\n            activeList = listId;\n            // Change the todo Items\n            _todo_item__WEBPACK_IMPORTED_MODULE_0__.default.clearTodoItemBoard();\n            _todo_item__WEBPACK_IMPORTED_MODULE_0__.default.renderTodoItemsToBoardFromDB(activeList);\n        })\n        \n    }\n\n    const getActiveList = () => {\n        return activeList\n    }\n\n    const addListToDatabase = (listName, listId) => {\n        rootRef.child(listId).set({\n            id: listId,\n            list_name: listName,\n         });\n    }\n\n    const deleteListFromDatabase = (listId) => {\n        rootRef.child(listId).remove();\n    }\n\n    const renderExistingLists = () => {\n        rootRef.once('value', snapshot => {\n            snapshot.forEach(element => {\n                let container = createListContainer(element.val()['list_name'], element.key);\n                appendListContainerToLists(container);\n                changeActiveList(element.key);\n                deleteList(container);\n            });\n        });\n    }\n\n    const allowListItemToBeActive = (listContainer) => {\n        let listTitleDiv = listContainer.querySelector('.list-title');\n        let listName = listTitleDiv.querySelector('span').innerHTML;\n        let currentListSelectedPreview = document.querySelector('#current-list')\n\n        listContainer.addEventListener('click', () => {\n            currentListSelectedPreview.textContent = listName;\n        })\n    } \n\n    const createListContainer = (listName, listId) => { \n        const listContainer = document.createElement('button');\n        listContainer.className = 'list-item';\n        const listTitle = document.createElement('span')\n        listTitle.innerHTML = listName\n        listContainer.id = listId;\n        let listTitleDiv = document.createElement('div');\n        listTitleDiv.className = 'list-title';\n\n        listTitleDiv.appendChild(listTitle);\n        listContainer.appendChild(listTitleDiv);\n\n        let deleteButtonDiv = document.createElement('div');\n        deleteButtonDiv.className = 'delete-button';\n        listContainer.appendChild(deleteButtonDiv);\n        let aWrapper = document.createElement('a');\n        let deleteIcon = document.createElement('img');\n        deleteIcon.src = '../dist/imgs/close-icon.png';\n        deleteIcon.className = 'delete-icon';\n        deleteIcon.id = 'delete-' + listName + '-list';\n        deleteButtonDiv.appendChild(deleteIcon);\n        deleteIcon.parentNode.insertBefore(aWrapper, deleteIcon);\n        listContainer.appendChild(deleteButtonDiv);\n\n        // Adding the functionality for it to be able to be selected and shown\n        allowListItemToBeActive(listContainer);\n\n        return listContainer\n    }\n\n    const appendListContainerToLists = (listContainer) => {\n        let lists = document.querySelector('.lists');\n        lists.appendChild(listContainer);\n    }\n\n    const deleteList = (listContainer) => {\n        let deleteButton = listContainer.childNodes[1];\n        deleteButton.addEventListener('click', () => {\n            listContainer.remove();\n            deleteListFromDatabase(listContainer.id);\n        })    \n    }\n\n    return {\n        changeActiveList,\n        getActiveList,\n        listLogic,\n        createGeneralList,\n        createListContainer,\n        appendListContainerToLists,\n        addListToDatabase,\n        deleteList,\n        renderExistingLists,\n    }\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (listItemLogic);\n\n\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/list-item.js?");

/***/ }),

/***/ "./src/modules/list-popup-menu.js":
/*!****************************************!*\
  !*** ./src/modules/list-popup-menu.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-item */ \"./src/modules/list-item.js\");\n\n\n/**\n * A pop up window for when creating a todo lists\n */\nconst PopupMenu = (() => {\n    \n    \n    //NEED TO ADD GSAP ANIMATIONS\n\n    let popupWindowOpen = false;\n    const listPopup = document.querySelector('.list-popup');\n    const popupInputBox = document.getElementById('list-name');\n    const database = firebase.database();\n    const rootRef = database.ref('/lists/');\n    \n\n    const openPopupWindow = () => {\n        let addButton = document.querySelector('.add-list-item');\n        addButton.addEventListener('click', () => {\n            listPopup.style.display = 'flex';\n        });\n        \n        popupWindowOpen = true;\n    }\n\n    const closePopupWindow = () => {\n        let cancelButton = document.querySelector('.cancel-list');\n        cancelButton.addEventListener('click', () => {\n            listPopup.style.display = 'none';\n        })\n\n        popupWindowOpen = false;\n    }\n\n    const addListItem = () => {\n        let addButton = document.querySelector('.add-list');\n        addButton.addEventListener('click', () => {\n            if (popupInputBox.value.length > 0) {  \n                const autoId = rootRef.push().key; // Creates distinct id's   \n                _list_item__WEBPACK_IMPORTED_MODULE_0__.default.addListToDatabase(popupInputBox.value, autoId);\n                let listContainer = _list_item__WEBPACK_IMPORTED_MODULE_0__.default.createListContainer(popupInputBox.value, autoId);\n                _list_item__WEBPACK_IMPORTED_MODULE_0__.default.appendListContainerToLists(listContainer);\n                _list_item__WEBPACK_IMPORTED_MODULE_0__.default.changeActiveList(autoId) // Allow the user to select a list\n                _list_item__WEBPACK_IMPORTED_MODULE_0__.default.deleteList(listContainer);\n                popupInputBox.value = null;\n            }\n    \n            else if (popupInputBox.value.length < 1) {\n                popupInputBox.id = 'list-name-invalid';\n                setInterval(() => {popupInputBox.id = 'list-name'}, 800); // change class name back     \n            }\n        });  \n        \n    }\n\n    return {\n        openPopupWindow,\n        closePopupWindow,\n        addListItem,\n    }\n\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PopupMenu);\n\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/list-popup-menu.js?");

/***/ }),

/***/ "./src/modules/todo-item-addition-button.js":
/*!**************************************************!*\
  !*** ./src/modules/todo-item-addition-button.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n\n/**\n * The logic for the add todo item button at the top\n */\n\nconst todoItemAddButton = (() => {\n\n    const popupClose = document.querySelector('.close-form');\n    const modalPopupMenu = document.querySelector('.modal-todo-item-form');\n    const addButton = document.querySelector('.add-todo-item');\n\n    const todoItemPopupLogic = () => {\n        addButton.addEventListener('click', () => {\n            modalPopupMenu.style.display = 'block';\n        });\n\n        popupClose.addEventListener('click', () => {\n            modalPopupMenu.style.display = 'none';\n        });\n\n        window.addEventListener('click', (event) => {\n            if (event.target == modalPopupMenu) {\n                modalPopupMenu.style.display = 'none';\n            }\n        })\n    }\n\n    return {\n        todoItemPopupLogic,\n    }\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (todoItemAddButton);\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/todo-item-addition-button.js?");

/***/ }),

/***/ "./src/modules/todo-item-popup.js":
/*!****************************************!*\
  !*** ./src/modules/todo-item-popup.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-item */ \"./src/modules/todo-item.js\");\n/* harmony import */ var _list_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-item */ \"./src/modules/list-item.js\");\n \n\n\n/**\n * A module to handle the todo item modular popup\n */\nconst submitTodoItem = (() => {\n    const database = firebase.database();\n    const rootRef = database.ref('todo-items');\n    const formWindow = document.querySelector('.modal-todo-item-form');\n    const submitFormButton = document.querySelector('.submit-todo-item');\n    const itemDescription = document.querySelector('#item-desc');\n    const dueDate = document.querySelector('#todo-due');\n    const priority = document.querySelector('#priority');\n\n    const submitForm = () => {\n        submitFormButton.addEventListener('click', () => {\n            const autoId = rootRef.push().key;\n            addTodoItemsToDb(autoId, itemDescription.value, dueDate.value, priority.value, _list_item__WEBPACK_IMPORTED_MODULE_1__.default.getActiveList());\n            _todo_item__WEBPACK_IMPORTED_MODULE_0__.default.createAndAddToDo(itemDescription.value, dueDate.value, priority.value);\n            \n            // Reset the form\n            itemDescription.value = '';\n            dueDate.value = '';\n            priority.value = '';\n            formWindow.style.display = 'none';\n        })\n    }\n    \n    const addTodoItemsToDb = (itemId, todoDescription, todoDueDate, todoItemPriority, parentList) => {\n        rootRef.child(itemId).set({\n            id: itemId,\n            item_description: todoDescription,\n            due_date: todoDueDate,\n            priority: todoItemPriority,\n            parent_list: parentList,\n        });\n    }\n\n    return {\n        submitForm,\n        addTodoItemsToDb,\n    }\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (submitTodoItem);\n\n\n//# sourceURL=webpack://todo-list-app/./src/modules/todo-item-popup.js?");

/***/ }),

/***/ "./src/modules/todo-item.js":
/*!**********************************!*\
  !*** ./src/modules/todo-item.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-item */ \"./src/modules/list-item.js\");\n\n\n/**\n * This is a todo item within a particular list\n */\n\nconst todoItem = (() => {\n\n    const database = firebase.database();\n    const rootRefTodoItems = database.ref('todo-items');\n    const rootRefLists = database.ref('lists');\n\n    const TodoItemObjectLogic = () => {\n        let container = createTodoItemContainer();\n        addTodoItemToBoard(container);\n    }\n\n    const createAndAddToDo = (description, dueDate, priority) => {\n        const parentContainer = createTodoItemContainer();\n\n        const itemDescriptionContainer = document.createElement('span');\n        itemDescriptionContainer.id = 'description-container';\n        const descriptionValue = document.createElement('p');\n        descriptionValue.textContent = description;\n        itemDescriptionContainer.appendChild(descriptionValue);\n\n        const dueDateContainer = document.createElement('span');\n        dueDateContainer.id = 'date-container';\n        const dueDateValue = document.createElement('p');\n        dueDateValue.textContent = dueDate;\n        dueDateContainer.appendChild(dueDateValue);\n\n        const priorityContainer = document.createElement('span');\n        priorityContainer.id = 'priority-container';\n        const priorityValue = document.createElement('p');\n        priorityValue.textContent = priority;\n        priorityContainer.appendChild(priorityValue);\n\n        const deleteTodoItem = document.createElement('span');\n        deleteTodoItem.className = 'delete-todo-item';\n        deleteTodoItem.innerHTML = '&times;'\n        \n        parentContainer.appendChild(itemDescriptionContainer);\n        parentContainer.appendChild(dueDateContainer);\n        parentContainer.appendChild(priorityContainer);\n        parentContainer.appendChild(deleteTodoItem);\n\n        addTodoItemToBoard(parentContainer);\n\n    }\n\n    const createTodoItemContainer = () => {\n        const container = document.createElement('div');\n        container.setAttribute('class', 'todo-item');\n\n        const radioButton = document.createElement('input');\n        radioButton.className = 'check-box';\n        radioButton.type = 'checkbox';\n\n        const spanCheckbox = document.createElement('span');\n        spanCheckbox.className = 'checkmark';\n\n        container.appendChild(radioButton);\n        container.appendChild(spanCheckbox);\n\n        return container;\n    }\n\n    const addTodoItemToBoard = (todoItemContainer) => {\n        let todoItemBoard = document.querySelector('.todo-items-board');\n        todoItemBoard.appendChild(todoItemContainer);\n        allowDeleteTodoItem(todoItemContainer);\n    }\n\n    const allowDeleteTodoItem = (item) => {\n        let deleteButton = item.querySelector('.delete-todo-item');\n        let itemDescription = item.querySelector('#description-container');\n        let descriptionValue = itemDescription.querySelector('p').innerHTML;\n        deleteButton.addEventListener('click', () => {\n            item.remove();\n            deleteItemFromDatabase(descriptionValue);\n        })    \n    }\n\n    const deleteItemFromDatabase = (itemDescription) => { \n        rootRefTodoItems.once('value', snapshot => {\n            snapshot.forEach(element => {\n                if (element.val()['item_description'] == itemDescription) {\n                    rootRefTodoItems.child(element.val()['id']).remove();\n                }\n            })\n        })\n    }\n\n    const deleteTodoItemOnListDelete = (list) => { // need to do this\n        rootRef.child(listId).remove();\n    }\n\n    const completedTodoItem = () => { // need to do this \n        \n    }\n\n    const clearTodoItemBoard = () => {\n        let todoItems = Array.from(document.getElementsByClassName('todo-item'));\n        todoItems.forEach(element => {\n            element.remove();\n        });\n    }\n\n    const renderTodoItemsToBoardFromDB = (activeList) => {\n        rootRefTodoItems.once('value', snapshot => {\n            snapshot.forEach(element => {\n                if (activeList == 'all-items-list') {\n                    createAndAddToDo(element.val()['item_description'], element.val()['due_date'], element.val()['priority']);\n                    return;\n                }\n                if (element.val()['parent_list'] == activeList) {\n                    createAndAddToDo(element.val()['item_description'], element.val()['due_date'], element.val()['priority']);\n                }\n            });\n        });\n    }\n\n    return {\n        createAndAddToDo,\n        TodoItemObjectLogic,\n        clearTodoItemBoard,\n        renderTodoItemsToBoardFromDB,\n    }\n\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (todoItem);\n\n//# sourceURL=webpack://todo-list-app/./src/modules/todo-item.js?");

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