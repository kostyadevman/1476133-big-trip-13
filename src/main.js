
import SiteMenuView from "./view/site-menu.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import {generateTripPoint, getOffers} from "./mock/trip-point.js";
import {RenderPosition, render} from "./utils/render.js";

import FilterPresenter from "./presenter/filter.js";
import TripInfoPresenter from "./presenter/trip-info.js";
import TripPresenter from "./presenter/trip.js";
import AddNewEvent from "./view/add-event";


const TRIP_POINT_COUNT = 5;

const points = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint);

const pointsModel = new PointsModel();

pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);


render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), new SiteMenuView(), RenderPosition.AFTEREND);

const tripInfoPresenter = new TripInfoPresenter(siteHeaderElement, pointsModel);
const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), filterModel);
const tripPresenter = new TripPresenter(siteMainElement, pointsModel, filterModel);

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

const addNewEventComponent = new AddNewEvent(true);
addNewEventComponent.setAddClickHandler(() => {
  tripPresenter.createNewPoint();
});
render(siteHeaderElement, addNewEventComponent, RenderPosition.BEFOREEND);
