
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {generateTripPoint} from "./mock/trip-point.js";
import {RenderPosition, render, remove} from "./utils/render.js";

import FilterPresenter from "./presenter/filter.js";
import TripInfoPresenter from "./presenter/trip-info.js";
import TripPresenter from "./presenter/trip.js";
import AddNewEvent from "./view/add-event";

import {MenuItem, UpdateType, FilterType} from "./const.js";

const TRIP_POINT_COUNT = 10;

const points = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint);

const pointsModel = new PointsModel();

pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);

const siteMenuComponent = new SiteMenuView();

const tripInfoPresenter = new TripInfoPresenter(siteHeaderElement, pointsModel);
const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), filterModel);
const tripPresenter = new TripPresenter(siteMainElement, pointsModel, filterModel);
const addNewEventComponent = new AddNewEvent(true);

let statisticsComponent = null;

addNewEventComponent.setAddClickHandler(() => {
  remove(statisticsComponent);
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  tripPresenter.createNewPoint(handleNewEventCancel);
  addNewEventComponent.getElement().disabled = true;
});

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      remove(statisticsComponent);
      tripPresenter.destroy();
      tripPresenter.init();
      break;
    case MenuItem.STATISTICS:
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(siteMainElement.querySelector(`.page-body__container`), statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), siteMenuComponent, RenderPosition.AFTEREND);

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

const handleNewEventCancel = () => {
  addNewEventComponent.getElement().disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

render(siteHeaderElement, addNewEventComponent, RenderPosition.BEFOREEND);
