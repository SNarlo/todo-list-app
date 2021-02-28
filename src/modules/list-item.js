/**
 * A List item is a list whoich holds to do items
 */

const createListItem = (() => {

    const createListContainer = (listName) => {
        const listContainer = document.createElement('div');
        listContainer.setAttribute('id', listName + '-list');
        listContainer.className = 'list-item';
        const listHeader = document.createElement('p');
        listHeader.innerHTML = listName;
        listContainer.appendChild(listHeader);
    }
    return {
        createListContainer,
    }
})();

export default createListItem;


