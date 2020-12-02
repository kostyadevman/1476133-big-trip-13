import TripInfo from "./view/trip-info.js";
import TripCost from "./view/trip-cost";
import SiteMenuView from "./view/site-menu";
import FilterView from "./view/filter";
import SortView from "./view/sort";
// import FormCreate from "./view/form-create";
import FormEdit from "./view/form-edit";
import TripPointList from "./view/trip-point-list";
import TripPoint from "./view/trip-point";
import {generateTripPoint} from "./mock/trip-point";
import {renderTemplate, renderElement, RenderPosition} from "./utils";

const TRIP_POINT_COUNT = 20;

const points = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint);
const pointsSorted = points.sort((a, b) => {
  return a.date - b.date;
});


const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);

renderElement(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), new SiteMenuView().getElement(), RenderPosition.AFTEREND);
renderElement(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), new FilterView().getElement(), RenderPosition.AFTEREND);

renderElement(siteMainElement.querySelector(`.trip-events`), new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement.querySelector(`.trip-events`), new TripPointList(points).getElement(), RenderPosition.BEFOREEND);

const tripPointListElement = siteMainElement.querySelector(`.trip-events__list`);

if (points.length > 0) {
  renderElement(siteHeaderElement, new TripInfo(pointsSorted).getElement(), RenderPosition.AFTERBEGIN);
  renderElement(siteHeaderElement.querySelector(`.trip-info`), new TripCost(points).getElement(), RenderPosition.BEFOREEND);
  renderElement(tripPointListElement, new FormEdit(pointsSorted[0]), RenderPosition.BEFOREEND);

  for (let i = 1; i < TRIP_POINT_COUNT; i++) {
    renderElement(tripPointListElement, new TripPoint(pointsSorted[i]).getElement(), RenderPosition.BEFOREEND);
  }
}


