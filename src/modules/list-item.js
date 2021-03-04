/**
 * A List item is a list whoich holds to do items
 */

const createListItem = (() => {

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
        let aWrapper = document.createElement('a');
        let deleteIcon = document.createElement('img');
        deleteIcon.src = '../dist/imgs/close-icon.png';
        deleteIcon.className = 'delete-icon';
        deleteButtonDiv.appendChild(deleteIcon);
        deleteIcon.parentNode.insertBefore(aWrapper, deleteIcon);
        listContainer.appendChild(deleteButtonDiv);
        
        return listContainer
    }

    const appendListContainerToLists = (listContainer) => {
        let lists = document.querySelector('.lists');
        lists.appendChild(listContainer);
    }


    return {
        createListContainer,
        appendListContainerToLists,
    }
})();

export default createListItem;


