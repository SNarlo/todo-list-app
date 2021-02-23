const createListItem = (() => {

    const createListContainer = (listName) => {
        const listContainer = document.createElement('div');
        listContainer.setAttribute('id', listName);
        listContainer.className = 'list-heading-container';
        listContainer.innerHTML = listName;
    }
    return {
        createListContainer,
    }
})();

export default createListItem;


