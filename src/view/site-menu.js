import {MENU_ITEMS} from "../const";

export const menuItemsTemplate = () => {
  return `${MENU_ITEMS.map((item) => `<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${item}</a>`).join(``)}`;
};
export const siteMenuTemplate = () => {
  const menuItems = menuItemsTemplate();
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${menuItems}
  </nav>`;
};
