
/**
 * This is a todo item within a particular list
 */

const todoItem = (() => {

    const database = firebase.database();
    const rootRefTodoItems = database.ref('todo-items');

    const TodoItemObjectLogic = () => {
        let container = createTodoItemContainer();
        addTodoItemToBoard(container);        
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

        const deleteTodoItem = document.createElement('div');
        deleteTodoItem.className = 'delete-todo-item';
        let trashCan = document.createElement('img');
        trashCan.className = 'delete-todo-item';
        trashCan.src = '../dist/imgs/trash-can.svg';  //TODO: NEED TO STOP THIS BRINGING UP MENU
        deleteTodoItem.appendChild(trashCan);
        
        parentContainer.appendChild(itemDescriptionContainer);
        parentContainer.appendChild(dueDateContainer);
        parentContainer.appendChild(priorityContainer);
        parentContainer.appendChild(deleteTodoItem);

        allowModalPopup(parentContainer, description, dueDate, priority); // Modal popup functionality
        addTodoItemToBoard(parentContainer);
        completedTodoItem(autoId);
        
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
        deleteButton.addEventListener('click', e => {
            e.cancelBubble = true;
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

    const allowModalPopup = (container, description, dueDate, priority) => { // need to do
        const popup = document.querySelector('.expanded-todo-item');
        const itemDescription = document.getElementById('expanded-item-desc');
        const dueDateInput = document.getElementById('expanded-todo-due');
        const closeForm = document.getElementById('close-expanded-todo-form');
        var priorityValue = priority.toLowerCase() + '-priority-expanded';
        const priorityButtons = document.getElementsByName('expanded-priority');
    
        container.addEventListener('click', () => {
            popup.style.display = 'block';
            itemDescription.value = description;
            dueDateInput.value = dueDate;
            priorityButtons.forEach(e => {
                if (e.id === priorityValue) {
                    e.checked = true;
                    console.log(e.checked);
                }
            })
        });

        closeForm.addEventListener('click', () => {
            popup.style.display = 'none';
        })
    }

    const completedTodoItem = (containerId) => { 
        let todoItemContainer = document.getElementById(containerId);
        const checkBox = todoItemContainer.querySelector('.check-box');
        checkBox.addEventListener('click', e => {
            if (!todoItemContainer.className.includes('-completed')) {
                e.cancelBubble = true;
                todoItemContainer.style.setProperty("text-decoration", "line-through");
                todoItemContainer.className += ' todo-item-completed';
            } else if (todoItemContainer.className.includes('-completed')) {
                e.cancelBubble = true;
                todoItemContainer.style.setProperty("text-decoration", "none");
                todoItemContainer.setAttribute('class', 'todo-item'); 
            }
            
        });
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
        clearTodoItemBoard,
        deleteTodoItemOnListDelete,
        renderTodoItemsToBoardFromDB,
    }

})();

export default todoItem;