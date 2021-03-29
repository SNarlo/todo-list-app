/**
 * A module to handle the todo item modular popup
 */
const submitTodoItem = (() => {
    const database = firebase.database();
    const rootRef = database.ref('todo-items');
    const formWindow = document.getElementById('modal-form');
    const submitFormButton = document.querySelector('.submit-todo-item');
    const itemDescription = document.querySelector('#item-desc');
    const dueDate = document.querySelector('#todo-due');
    const priority = document.querySelector('#priority');
    const parent = "General"

    const submitForm = () => {
        submitFormButton.addEventListener('click', () => {
            const autoId = rootRef.push().key;
            addTodoItemsToDb(autoId, itemDescription.value, dueDate.value, priority.value, parent);
        })
        itemDescription.value = '';
        dueDate.value = '';
        priority.value = '';
        formWindow.style.display = 'none';
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
        addTodoItemsToDb,
    }
})();

export default submitTodoItem;
