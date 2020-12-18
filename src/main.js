import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import TripPointListView from "./view/trip-point-list.js";
import {generateTripPoint} from "./mock/trip-point.js";
import {render, RenderPosition} from "./utils/render.js";
import {sortPointDay} from "./utils/point.js";

import TripPresenter from "./presenter/trip.js";

const TRIP_POINT_COUNT = 20;

const points = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint);

const pointsSorted = points.sort(sortPointDay);

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);


render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), new SiteMenuView(), RenderPosition.AFTEREND);
render(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), new FilterView(), RenderPosition.AFTEREND);

const tripPointListComponent = new TripPointListView();
render(siteMainElement.querySelector(`.trip-events`), tripPointListComponent, RenderPosition.BEFOREEND);

if (points.length > 0) {
  render(siteHeaderElement, new TripInfoView(pointsSorted), RenderPosition.AFTERBEGIN);
  render(siteHeaderElement.querySelector(`.trip-info`), new TripCostView(points), RenderPosition.BEFOREEND);
}

const tripPresenter = new TripPresenter(siteHeaderElement, siteMainElement);
tripPresenter.init(pointsSorted);

