/**
 * A pop up window for when creating a todo item
 */
const PopupMenu = (() => {
    
    const listPopup = document.querySelector('.list-popup');

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

    return {
        openPopupWindow,
        closePopupWindow,

    }

})();

export default PopupMenu;

