/**
 * A List item is a list whoich holds to do items
 */

const createListItem = (() => {

    const database = firebase.database();
    const rootRef = database.ref('lists');


    const addListToDatabse = (list) => {
        rootRef.child(list + '-list').set({
             list_name: list,
             list_objects: {
             },
         })
     }

     const renderExistingLists = () => {
        rootRef.orderByKey().on('value', snapshot => {
            snapshot.forEach(element => {
                let container = createListContainer(element.val()['list_name']);
                appendListContainerToLists(container);
                addDeleteFeature(container);
            });
        })
     }

    // Need to make this so its added to the db first and queried to render it 
    // same for deleting items. When the site starts the render function runs and 
    // render all the lists
    const createListContainer = (listName) => { 

        const listContainer = document.createElement('button');
        listContainer.setAttribute('id', listName + '-list');
        listContainer.className = 'list-item';
        const listTitle = document.createElement('span')
        listTitle.innerHTML = listName
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

        return listContainer
    }

    const appendListContainerToLists = (listContainer) => {
        let lists = document.querySelector('.lists');
        lists.appendChild(listContainer);
    }

    const addDeleteFeature = (listContainer) => {
        let deleteButton = listContainer.childNodes[1];
        deleteButton.addEventListener('click', () => {
            listContainer.remove();
        })    
    }


    return {
        createListContainer,
        appendListContainerToLists,
        addListToDatabse,
        addDeleteFeature,
        renderExistingLists,
    }
})();

export default createListItem;


