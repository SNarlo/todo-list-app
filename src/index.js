import PopupMenu from './modules/list-popup-menu';
import createListItem from './modules/list-item';
import todoItemAddButton from './modules/todo-item-addition';

init();

function init() {
  //Popup logic
  PopupMenu.openPopupWindow();
  PopupMenu.closePopupWindow();
  PopupMenu.addListItem();
  //List item logic
  createListItem.renderExistingLists();

  //Todo item logic
  todoItemAddButton.todoItemPopup();
}