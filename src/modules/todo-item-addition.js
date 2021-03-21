import createTodoItem from './todo-item.js';

/**
 * The logic for the add todo item button at the top
 */

const todoItemAddButton = (() => {
    const todoItemPopup = () => {
        let addButton = document.querySelector('.add-todo-item');
        addButton.addEventListener('click', createTodoItem.addTodoItemToBoard());
    }

    return {
        todoItemPopup,
    }
})();

export default todoItemAddButton
