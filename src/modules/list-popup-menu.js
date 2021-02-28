import createListItem from './list-item';

/**
 * A pop up window for when creating a todo item
 */
const PopupMenu = (() => {
    
    const listPopup = document.querySelector('.list-popup');
    const popupInputBox = document.querySelector('.list-name');

    const openPopupWindow = () => {
        let addButton = document.querySelector('.add-list-item');
        addButton.addEventListener('click', () => {
            listPopup.style.visibility = "inherit";
        });
        
    }

    const closePopupWindow = () => {
        let cancelButton = document.querySelector('.cancel-list');
        cancelButton.addEventListener('click', () => {
            listPopup.style.visibility = 'hidden';
        })
    }

    const addListItem = () => {
        let addButton = document.querySelector('.add-list');

        if ((popupInputBox.value != null)) { // need to fix this !!
            console.log(popupInputBox.value);
            let listName = popupInputBox.textContent;
            addButton.addEventListener('click', createListItem.createListContainer(listName));
        }
        
        if (!(popupInputBox && popupInputBox.value)) {
            addButton.addEventListener('click', () =>{
                
                popupInputBox.className = 'list-name-invalid';
                setInterval(() => {popupInputBox.className = 'list-name'}, 700); // change class name back
            });
        }
        
        
        
    }
    

    return {
        openPopupWindow,
        closePopupWindow,
        addListItem,
    }

})();

export default PopupMenu;

