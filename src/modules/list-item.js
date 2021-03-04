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
        listContainer.appendChild(listTitle);

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


