import PopupMenu from './modules/list-popup-menu';
import createListItem from './modules/list-item'

init();

function init() {
  //List logic
  PopupMenu.openPopupWindow();
  PopupMenu.closePopupWindow();
  PopupMenu.addListItem();
  createListItem.renderExistingLists();
}