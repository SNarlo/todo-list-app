import createListItem from './list-item';

/**
 * A pop up window for when creating a todo item
 */
const PopupMenu = (() => {
    
    const listPopup = document.querySelector('.list-popup');
    const popupInputBox = document.getElementById('list-name');

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

        addButton.addEventListener('click', () => {
            if (popupInputBox.value.length > 0) {     
                console.log("Contents in input field");
            }
    
            if (popupInputBox.value.length < 1) {
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

