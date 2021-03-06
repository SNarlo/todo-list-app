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
    

    const deleteListItem = (buttonId) => {
        let button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
            console.log('dededed');
        })
    }

    return {
        createListContainer,
        appendListContainerToLists,
        deleteListItem,
    }
})();

export default createListItem;


