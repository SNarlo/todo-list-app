import listItemLogic from './list-item'

/**
 * This is a todo item within a particular list
 */

const todoItem = (() => {

    const database = firebase.database();
    const rootRefTodoItems = database.ref('todo-items');
    const rootRefLists = database.ref('lists');

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

        const deleteTodoItem = document.createElement('span');
        deleteTodoItem.className = 'delete-todo-item';
        deleteTodoItem.innerHTML = '&times;'
        
        parentContainer.appendChild(itemDescriptionContainer);
        parentContainer.appendChild(dueDateContainer);
        parentContainer.appendChild(priorityContainer);
        parentContainer.appendChild(deleteTodoItem);

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
        allowDeleteTodoItem(todoItemContainer);
    }

    const allowDeleteTodoItem = (item) => {
        let deleteButton = item.querySelector('.delete-todo-item');
        let itemDescription = item.querySelector('#description-container');
        let descriptionValue = itemDescription.querySelector('p').innerHTML;
        deleteButton.addEventListener('click', () => {
            item.remove();
            deleteItemFromDatabase(descriptionValue);
        })    
    }

    const deleteItemFromDatabase = (itemDescription) => { 
        rootRefTodoItems.once('value', snapshot => {
            snapshot.forEach(element => {
                if (element.val()['item_description'] == itemDescription) {
                    rootRefTodoItems.child(element.val()['id']).remove();
                }
            })
        })
    }

    const deleteTodoItemOnListDelete = (list) => { // need to do this
        rootRef.child(listId).remove();
    }

    const completedTodoItem = () => { // need to do this 
        
    }

    const clearTodoItemBoard = () => {
        let todoItems = Array.from(document.getElementsByClassName('todo-item'));
        todoItems.forEach(element => {
            element.remove();
        });
    }

    const renderTodoItemsToBoardFromDB = (activeList) => {
        rootRefTodoItems.once('value', snapshot => {
            snapshot.forEach(element => {
                if (activeList == 'all-items-list') {
                    createAndAddToDo(element.val()['item_description'], element.val()['due_date'], element.val()['priority']);
                    return;
                }
                if (element.val()['parent_list'] == activeList) {
                    createAndAddToDo(element.val()['item_description'], element.val()['due_date'], element.val()['priority']);
                }
            });
        });
    }

    return {
        createAndAddToDo,
        TodoItemObjectLogic,
        clearTodoItemBoard,
        renderTodoItemsToBoardFromDB,
    }

})();

export default todoItem;