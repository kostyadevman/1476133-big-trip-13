import {SORTS} from "../const";
import AbstractView from "./abstract.js";

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

export default class Sort extends AbstractView {
  getTemplate() {
    return createSortTemplate();
  }
}
