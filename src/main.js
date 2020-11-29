import {tripInfoTemplate} from "./view/trip-info.js";
import {tripCostTemplate} from "./view/trip-cost";
import {siteMenuTemplate} from "./view/site-menu";
import {filterTemplate} from "./view/filter";
import {sortTemplate} from "./view/sort";
import {formCreateTemplate} from "./view/form-create";
import {formEditTemplate} from "./view/form-edit";
import {tripPointListTemplate} from "./view/trip-point-list";
import {tripPointTemplate} from "./view/trip-point";
import {generateTripPoint} from "./mock/trip-point";
const TRIP_POINT_COUNT = 20;

const points = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint);
const pointsSorted = points.sort((a, b) => {
  return a.date - b.date;
});

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);


render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), siteMenuTemplate(), `afterend`);
render(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), filterTemplate(), `afterend`);

render(siteMainElement.querySelector(`.trip-events`), sortTemplate(), `beforeend`);
render(siteMainElement.querySelector(`.trip-events`), tripPointListTemplate(points), `beforeend`);

const tripPointListElement = siteMainElement.querySelector(`.trip-events__list`);

if (points.length > 0) {
  render(siteHeaderElement, tripInfoTemplate(pointsSorted), `afterbegin`);
  render(siteHeaderElement.querySelector(`.trip-info`), tripCostTemplate(points), `beforeend`);
  render(tripPointListElement, formEditTemplate(pointsSorted[0]), `beforeend`);

  for (let i = 1; i < TRIP_POINT_COUNT; i++) {
    render(tripPointListElement, tripPointTemplate(pointsSorted[i]), `beforeend`);
  };
};


