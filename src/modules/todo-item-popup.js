import todoItem from './todo-item'; 
import listItemLogic from './list-item';

/**
 * A module to handle the todo item modular popups
 */
const submitTodoItem = (() => {
    const database = firebase.database();
    const rootRef = database.ref('todo-items');
    const formWindow = document.querySelector('.modal-todo-item-form');
    const submitFormButton = document.querySelector('.submit-todo-item');
    const itemDescription = document.querySelector('#item-desc');
    const dueDate = document.querySelector('#todo-due');
    const priority = document.getElementsByName('priority');
    const editPriority = document.getElementsByName('expanded-priority');
    
    function checkedPriorityAddition() {
        var value = '';
        priority.forEach(element => {
            if (element.checked) {
                let id = element.id + '-label';
                let priorityValue = document.getElementById(id).innerHTML;
                value = priorityValue;
            }
        });
        return value;
    }
    
    //Bad code practice, but it works for the situation I made a mess of
    function checkedPriorityEdit() {
        var value = '';
        editPriority.forEach(element => {
            if (element.checked) {
                let id = element.id + '-label';
                let priorityValue = document.getElementById(id).innerHTML;
                value = priorityValue;
            }
        });
        return value;
    }

    const submitForm = () => {
        submitFormButton.addEventListener('click', () => {
            const autoId = rootRef.push().key;
            addTodoItemsToDb(autoId, itemDescription.value, dueDate.value, checkedPriorityAddition(), listItemLogic.getActiveList());
            todoItem.createAndAddToDo(itemDescription.value, dueDate.value, checkedPriorityAddition(), autoId);
            
            // Reset the form
            itemDescription.value = '';
            dueDate.value = '';
            priority.forEach(element => {
                if (element.checked) {
                    element.checked = false;
                }
            })
            formWindow.style.display = 'none';
        })
    }

    const submitEdit = (itemId) => {
        const popup = document.querySelector('.expanded-todo-item');
        const submitEditButton = document.querySelector('.submit-todo-item-edit');
        submitEditButton.addEventListener('click', () => {      

            // form items
            let formDescription = document.getElementById('expanded-item-desc');
            let formNewDate = document.getElementById('expanded-todo-due');
            let formNewPriority = checkedPriorityEdit();
            
            let todoItem = document.getElementById(itemId);
            console.log(todoItem);
            
            // Still need to fix this!!!!!
            // Change the values in db
            // Do mobile view, then done
        })

        //submitEditButton.removeEventListener('click');
    }
    
    const addTodoItemsToDb = (itemId, todoDescription, todoDueDate, todoItemPriority, parentList) => {
        rootRef.child(itemId).set({
            id: itemId,
            item_description: todoDescription,
            due_date: todoDueDate,
            priority: todoItemPriority,
            parent_list: parentList,
        });
    }

    return {
        submitForm,
        submitEdit,
        addTodoItemsToDb,
    }
})();

export default submitTodoItem;
