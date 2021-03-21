/**
 * This is a todo item within a particular list
 */

const createTodoItem = (() => {

    const createTodoItemContainer = () => {
        const container = document.createElement('div');
        container.setAttribute('class', 'todo-item');

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';

        container.appendChild(radioButton);

        return container;
    }

    const addTodoItemToBoard = () => {
        let todoItemBoard = document.querySelector('.todo-items-board');
        
        let item = createTodoItemContainer();

        todoItemBoard.appendChild(item);
    }

    return {
        createTodoItemContainer,
        addTodoItemToBoard,
    }

})();

export default createTodoItem;