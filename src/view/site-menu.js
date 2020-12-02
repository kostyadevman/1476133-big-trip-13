import {MENU_ITEMS} from "../const";
import {createElement} from "../utils";

const menuItemsTemplate = () => {
  return `${MENU_ITEMS.map((item) => `<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${item}</a>`).join(``)}`;
};

const createSiteMenuTemplate = () => {
  const menuItems = menuItemsTemplate();
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${menuItems}
  </nav>`;
};

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
