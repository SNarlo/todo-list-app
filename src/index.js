import PopupMenu from './modules/list-popup-menu';
import createListItem from './modules/list-item';
import todoItemAddButton from './modules/todo-item-addition';
import submitTodoItem from './modules/todo-item-popup';
init();

function init() {
  //Popup logic
  PopupMenu.openPopupWindow();
  PopupMenu.closePopupWindow();
  PopupMenu.addListItem();
  //List item logic
  createListItem.listLogic();
  //Todo item logic
  todoItemAddButton.todoItemPopupLogic();
  submitTodoItem.submitForm();
}