import createListItem from './list-item';

/**
 * A pop up window for when creating a todo lists
 */
const PopupMenu = (() => {
    
    //NEED TO ADD GSAP ANIMATIONS

    let popupWindowOpen = false;
    const listPopup = document.querySelector('.list-popup');
    const popupInputBox = document.getElementById('list-name');

    const openPopupWindow = () => {
        let addButton = document.querySelector('.add-list-item');
        addButton.addEventListener('click', () => {
            listPopup.style.display = 'flex';
        });
        
        popupWindowOpen = true;
    }

    const closePopupWindow = () => {
        let cancelButton = document.querySelector('.cancel-list');
        cancelButton.addEventListener('click', () => {
            listPopup.style.display = 'none';
        })

        popupWindowOpen = false;
    }

    const addListItem = () => {
        let addButton = document.querySelector('.add-list');

        addButton.addEventListener('click', () => {
            if (popupInputBox.value.length > 0) {     
                let listContainer = createListItem.createListContainer(popupInputBox.value);
                createListItem.appendListContainerToLists(listContainer);
                createListItem.addDeleteFeature(listContainer);
                popupInputBox.value = null;
            }
    
            else if (popupInputBox.value.length < 1) {
                popupInputBox.id = 'list-name-invalid';
                setInterval(() => {popupInputBox.id = 'list-name'}, 800); // change class name back     
            }
        });  
        
    }

    return {
        openPopupWindow,
        closePopupWindow,
        addListItem,
    }

})();

export default PopupMenu;

