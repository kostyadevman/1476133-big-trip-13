import PointsModel from "./model/points.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";
import DestinationModel from "./model/destinations.js";

import AddNewEventView from "./view/add-event";
import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";

import FilterPresenter from "./presenter/filter.js";
import TripInfoPresenter from "./presenter/trip-info.js";
import TripPresenter from "./presenter/trip.js";

import Api from "./api.js";

import {RenderPosition, render, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";


const AUTHORIZATION = `Basic KML3sf3dfKwcl7sa0B`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationModel();

const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);

const siteMenuComponent = new SiteMenuView();
const addNewEventComponent = new AddNewEventView(true);
let statisticsComponent = null;

const tripInfoPresenter = new TripInfoPresenter(siteHeaderElement, pointsModel);
const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), filterModel);
const tripPresenter = new TripPresenter(siteMainElement, pointsModel, filterModel, offersModel, destinationsModel, api);

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

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

const handleNewEventCancel = () => {
  addNewEventComponent.getElement().disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};


api.getAllData()
  .then(([offers, destinations, points]) => {
    destinationsModel.setDestinations(destinations);
    offersModel.setOffers(offers);
    pointsModel.setPoints(UpdateType.INIT, points);
    render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), siteMenuComponent, RenderPosition.AFTEREND);
    render(siteHeaderElement, addNewEventComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), siteMenuComponent, RenderPosition.AFTEREND);
    render(siteHeaderElement, addNewEventComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });


