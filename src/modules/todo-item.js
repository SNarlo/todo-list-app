/**
 * This is a todo item within a particular list
 */

const todoItem = (() => {

    const TodoItemObjectLogic = () => {
        let container = createTodoItemContainer();
        addTodoItemToBoard(container);
    }

    const createAndAddToDo = (description, dueDate, priority) => {
        const parentContainer = createTodoItemContainer();

        const itemDescriptionContainer = document.createElement('span');
        itemDescriptionContainer.id = 'description-container';
        const descriptionValue = document.createElement('p');
        descriptionValue.textContent = description;
        itemDescriptionContainer.appendChild(descriptionValue);

        const dueDateContainer = document.createElement('span');
        dueDateContainer.id = 'date-container';
        const dueDateValue = document.createElement('p');
        dueDateValue.textContent = dueDate;
        dueDateContainer.appendChild(dueDateValue);

        const priorityContainer = document.createElement('span');
        priorityContainer.id = 'priority-container';
        const priorityValue = document.createElement('p');
        priorityValue.textContent = priority;
        priorityContainer.appendChild(priorityValue);
        
        parentContainer.appendChild(itemDescriptionContainer);
        parentContainer.appendChild(dueDateContainer);
        parentContainer.appendChild(priorityContainer);

        addTodoItemToBoard(parentContainer);

    }


    const createTodoItemContainer = () => {
        const container = document.createElement('div');
        container.setAttribute('class', 'todo-item');

        const radioButton = document.createElement('input');
        radioButton.className = 'check-box';
        radioButton.type = 'checkbox';

        const spanCheckbox = document.createElement('span');
        spanCheckbox.className = 'checkmark';

        container.appendChild(radioButton);
        container.appendChild(spanCheckbox);

        return container;
    }

    const addTodoItemToBoard = (todoItemContainer) => {
        let todoItemBoard = document.querySelector('.todo-items-board');
        todoItemBoard.appendChild(todoItemContainer);
    }

    return {
        createAndAddToDo,
        TodoItemObjectLogic,
    }

})();

export default todoItem;