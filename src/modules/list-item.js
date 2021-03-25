/**
 * A List item is a list whoich holds to do items
 */
const createListItem = (() => {

    const database = firebase.database();
    const rootRef = database.ref('lists');

    const listLogic = () => {
        renderExistingLists();
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
                let container = createListContainer(element.val()['list_name'], element.key);
                appendListContainerToLists(container);

                deleteList(container);
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
        })    
    }

    return {
        listLogic,
        createListContainer,
        appendListContainerToLists,
        addListToDatabase,
        deleteList,
        renderExistingLists,
    }
})();

export default createListItem;


