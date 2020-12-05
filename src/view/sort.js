import {SORTS} from "../const";
import {createElement} from "../utils";

export const sortItemsTemplate = () => {
  return `${SORTS.map((item) => `<div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item}">
    <label class="trip-sort__btn" for="sort-day">${item}</label>
  </div>`).join(``)}`;
};
export const createSortTemplate = () => {
  const sorts = sortItemsTemplate();
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sorts}
  </form>`;
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
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
