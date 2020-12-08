import AbstracView from "./abstract.js";
import {FILTERS} from "../const";

export const filterItemsTemplate = () => {
  return `${FILTERS.map((filter) => `<div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`).join(``)}`;
};

const createFilterTemplate = () => {
  const filters = filterItemsTemplate();
  return `<form class="trip-filters" action="#" method="get">
    ${filters}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filter extends AbstracView {
  getTemplate() {
    return createFilterTemplate();
  }
}
