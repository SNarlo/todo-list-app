/**
 * A pop up window for when creating a todo item
 */
const PopupMenu = (() => {
    
    let popupWindowActive = false;

    const openPopupWindow = () => {
        const addButton = document.querySelector('.add-list-item');
        addButton.addEventListener('click', createPopupWindow);

    }

    const createPopupWindow = () => {
        if (!popupWindowActive) {
            const popupWindow = document.createElement('div');
            popupWindow.id = 'list-popup';
            
            const nameField = document.createElement('input');
            nameField.id = 'list-name';

            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'list-buttons';

            const addButton = document.createElement('button');
            addButton.innerHTML = 'Add';
            addButton.id = 'add-list-button';

            const cancelButton = document.createElement('button');
            cancelButton.innerHTML = 'Cancel';
            cancelButton.id = 'cancel-list-button';

            buttonDiv.appendChild(addButton);
            buttonDiv.appendChild(cancelButton);

            popupWindow.appendChild(nameField);
            popupWindow.appendChild(buttonDiv);

            const listMenu = document.querySelector('.lists');
            listMenu.appendChild(popupWindow);
        }
        popupWindowActive = true;
        
    }

    const closePopup = () => { // NEED TO FIX CLOSING THE POPUP
        cancelButton = document.getElementById('cancel-list-button');
        cancelButton.addEventListener('click', () => {
            const popup = document.querySelector('#list-popup');
            const listWindow = document.querySelector('.lists');
            listWindow.replaceChild(popup);
            popupWindowActive = false;
        })
    }

    return {
        openPopupWindow,
        closePopup,
    }

})();

export default PopupMenu;

