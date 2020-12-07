import {MENU_ITEMS} from "../const";
import AbstractView from "./abstract.js";

const menuItemsTemplate = () => {
  return `${MENU_ITEMS.map((item) => `<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${item}</a>`).join(``)}`;
};

const createSiteMenuTemplate = () => {
  const menuItems = menuItemsTemplate();
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${menuItems}
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
