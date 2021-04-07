import listItemLogic from './list-item'
import todoItemAddButton from './todo-item-addition-button';

/**
 * This is a todo item within a particular list
 */

const todoItem = (() => {

    const database = firebase.database();
    const rootRefTodoItems = database.ref('todo-items');

    const TodoItemObjectLogic = () => {
        let container = createTodoItemContainer();
        addTodoItemToBoard(container);  
        console.log(todoItemsArray);      
    }

    const createAndAddToDo = (description, dueDate, priority, autoId) => {
        const parentContainer = createTodoItemContainer();
        parentContainer.id = autoId;

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
        todoItemPriorityOnHover(parentContainer.id, priority);
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
        let itemId = item.id;
        deleteButton.addEventListener('click', () => {
            item.remove();
            deleteItemFromDatabase(itemId);
        })    
    }

    const deleteItemFromDatabase = (itemId) => { 
        rootRefTodoItems.once('value', snapshot => {
            snapshot.forEach(element => {
                if (element.val()['id'] == itemId) {
                    rootRefTodoItems.child(element.val()['id']).remove();
                }
            })
        })
    }

    const deleteTodoItemOnListDelete = (listId) => { 
        rootRefTodoItems.once('value', snapshot => {
            snapshot.forEach(element => {
                if (element.val()['parent_list'] == listId) {
                    let itemId = element.val()['id'];
                    let todoItem = document.getElementById(itemId);
                    todoItem.remove()
                    deleteItemFromDatabase(itemId);
                } 
            })
        })
    }

    const modalPopup = () => { // need to do

    }

    const todoItemPriorityOnHover = (itemId, priority) => {
        let todoItem = document.getElementById(itemId);
        if (priority === '!') {
            todoItem.addEventListener('mouseenter', () => {
                todoItem.style.border = '1px solid rgba(255, 255, 0, 0.5)';
            });
            todoItem.addEventListener('mouseleave', () => {
                todoItem.style.border = '1px solid white';
            });
        } else if (priority === '!!') {
            todoItem.addEventListener('mouseenter', () => {
                todoItem.style.border = '1px solid rgba(255, 165, 0, 0.5)';
            });
            todoItem.addEventListener('mouseleave', () => {
                todoItem.style.border = '1px solid white';
            });
        } else if (priority === '!!!') {
            todoItem.addEventListener('mouseenter', () => {
                todoItem.style.border = '1px solid rgba(255, 0, 0, 0.5)';
            });
            todoItem.addEventListener('mouseleave', () => {
                todoItem.style.border = '1px solid white';
            });
        }
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
                    createAndAddToDo(element.val()['item_description'], element.val()['due_date'], element.val()['priority'], element.val()['id']);
                    return;
                }
                if (element.val()['parent_list'] == activeList) {
                    createAndAddToDo(element.val()['item_description'], element.val()['due_date'], element.val()['priority'], element.val()['id']);
                }
            });
        });
    }

    return {
        createAndAddToDo,
        TodoItemObjectLogic,
        todoItemPriorityOnHover,
        clearTodoItemBoard,
        deleteTodoItemOnListDelete,
        renderTodoItemsToBoardFromDB,
    }

})();

export default todoItem;