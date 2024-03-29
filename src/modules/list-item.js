import todoItem from './todo-item'

/**
 * A List item is a list whoich holds to do items
 */
const listItemLogic = (() => {

    const database = firebase.database();
    const rootRef = database.ref('lists');
    let activeList = "all-items-list";
    let currentList = document.getElementById('current-list');


    const listLogic = () => {
        renderExistingLists()
        createGeneralList();
    }

    const createGeneralList = () => {
        let container = document.getElementById('all-items-list')
        addListToDatabase('All Items', 'all-items-list');
        allowListItemToBeActive(container);
        changeActiveListOnClick(container.id);
    }
    
    const changeActiveListOnClick = (listId) => {
        let list = document.getElementById(listId);
        list.addEventListener('click', () => {
            activeList = listId;
            // Change the todo Items
            todoItem.clearTodoItemBoard();
            todoItem.renderTodoItemsToBoardFromDB(activeList);
        })   
    }

    const changeActiveListOnDelete = () => {
        activeList = 'all-items-list'
        // Change the todo Items
        todoItem.clearTodoItemBoard();
        todoItem.renderTodoItemsToBoardFromDB(activeList);
        currentList.innerHTML = 'All Items'
    }

    const getActiveList = () => {
        return activeList
    }

    const addListToDatabase = (listName, listId) => {
        rootRef.child(listId).set({
            id: listId,
            list_name: listName,
         });
    }

    const deleteListFromDatabase = (listId) => {
        rootRef.child(listId).remove();
    }

    const renderExistingLists = () => {
        rootRef.once('value', snapshot => {
            snapshot.forEach(element => {
                if (element.val()['list_name'] != 'All Items') {
                    let container = createListContainer(element.val()['list_name'], element.key);
                    appendListContainerToLists(container);
                    changeActiveListOnClick(element.key);
                    deleteList(container);
                }
            });
        });
    }

    const allowListItemToBeActive = (listContainer) => {
        let listTitleDiv = listContainer.querySelector('.list-title');
        let listName = listTitleDiv.querySelector('span').innerHTML;
        let currentListSelectedPreview = document.querySelector('#current-list')

        listContainer.addEventListener('click', () => {
            currentListSelectedPreview.textContent = listName;
        })
    } 

    const createListContainer = (listName, listId) => { 
        const listContainer = document.createElement('button');
        listContainer.className = 'list-item';
        const listTitle = document.createElement('span')
        listTitle.innerHTML = listName
        listContainer.id = listId;
        let listTitleDiv = document.createElement('div');
        listTitleDiv.className = 'list-title';

        listTitleDiv.appendChild(listTitle);
        listContainer.appendChild(listTitleDiv);

        let deleteButtonDiv = document.createElement('div');
        deleteButtonDiv.className = 'delete-button';
        listContainer.appendChild(deleteButtonDiv);
        let aWrapper = document.createElement('a');
        let deleteIcon = document.createElement('img');
        deleteIcon.src = '../dist/imgs/close-icon.png';
        deleteIcon.className = 'delete-icon';
        deleteIcon.id = 'delete-' + listName + '-list';
        deleteButtonDiv.appendChild(deleteIcon);
        deleteIcon.parentNode.insertBefore(aWrapper, deleteIcon);
        listContainer.appendChild(deleteButtonDiv);

        // Adding the functionality for it to be able to be selected and shown
        allowListItemToBeActive(listContainer);

        return listContainer
    }

    const appendListContainerToLists = (listContainer) => {
        let lists = document.querySelector('.lists');
        lists.appendChild(listContainer);
    }

    const deleteList = (listContainer) => {
        let deleteButton = listContainer.childNodes[1];
        deleteButton.addEventListener('click', () => {
            listContainer.remove();
            deleteListFromDatabase(listContainer.id);
            currentList.innerHTML = "All Items"
            todoItem.deleteTodoItemOnListDelete(listContainer.id); // Needd to still change the active list
            setTimeout(changeActiveListOnDelete, 1500);
        })    
    }

    return {
        changeActiveList : changeActiveListOnClick,
        getActiveList,
        listLogic,
        createGeneralList,
        createListContainer,
        appendListContainerToLists,
        addListToDatabase,
        deleteList,
        renderExistingLists,
    }
})();

export default listItemLogic;


