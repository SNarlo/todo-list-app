import PopupMenu from './modules/list-popup-menu';
import listItemLogic from './modules/list-item';
import todoItemAddButton from './modules/todo-item-addition-button';
import submitTodoItem from './modules/todo-item-popup';


init();

function init() {
  //Popup logic
  PopupMenu.openPopupWindow();
  PopupMenu.closePopupWindow();
  PopupMenu.addListItem();
  //List item logic
  listItemLogic.listLogic();
  listItemLogic.createGeneralList();
  //Todo item logic
  todoItemAddButton.todoItemPopupLogic();
  submitTodoItem.submitForm();
}