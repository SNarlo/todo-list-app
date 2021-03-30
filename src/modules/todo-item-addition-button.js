
/**
 * The logic for the add todo item button at the top
 */

const todoItemAddButton = (() => {

    const popupClose = document.querySelector('.close-form');
    const modalPopupMenu = document.querySelector('.modal-todo-item-form');
    const addButton = document.querySelector('.add-todo-item');

    const todoItemPopupLogic = () => {
        addButton.addEventListener('click', () => {
            modalPopupMenu.style.display = 'block';
        });

        popupClose.addEventListener('click', () => {
            modalPopupMenu.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modalPopupMenu) {
                modalPopupMenu.style.display = 'none';
            }
        })
    }

    return {
        todoItemPopupLogic,
    }
})();

export default todoItemAddButton;
