/**
 * This is a todo item within a particular list
 */

// const todoItemDataBaseFunctions = ( () => {
//     const database = firebase.database();
//     const rootRef = database.ref('todo-items');

//     const addTodoItemsToDb = (itemDescription, itemId, dueDate, priority ,parentList,) => {
//         rootRef.child(itemId).set({
//             id: itemId,
//             item_description: itemDescription,
//             due_date: dueDate,
//             priority: priority,
//             parent_list: parentList,
//         });
//     }

//     return {
//         addTodoItemsToDb,
//     }
// })();


const createTodoItem = (() => {

    const TodoItemObjectLogic = () => {
        let container = createTodoItemContainer();
        addTodoItemToBoard(container);
    }


    const createTodoItemContainer = () => {
        const container = document.createElement('div');
        container.setAttribute('class', 'todo-item');

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';

        container.appendChild(radioButton);

        return container;
    }

    const addTodoItemToBoard = (todoItemContainer) => {
        let todoItemBoard = document.querySelector('.todo-items-board');
        todoItemBoard.appendChild(todoItemContainer);
    }

    return {
        TodoItemObjectLogic,
    }

})();

export default createTodoItem;