import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost";
import SiteMenuView from "./view/site-menu";
import FilterView from "./view/filter";
import SortView from "./view/sort";
// import FormCreateView from "./view/form-create";
import FormEditView from "./view/form-edit";
import TripPointListView from "./view/trip-point-list";
import TripPointView from "./view/trip-point";
import NoTripPoint from "./view/on-trip-point";
import {generateTripPoint} from "./mock/trip-point";
import {render, RenderPosition} from "./utils";

const TRIP_POINT_COUNT = 10;

const points = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint);
const pointsSorted = points.sort((a, b) => {
  return a.date - b.date;
});


const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new TripPointView(point);
  const pointEditComponent = new FormEditView(point);


  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const closeButtonClickHandler = () => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  const pointFormEdit = pointEditComponent.getElement().querySelector(`form`);

  pointFormEdit.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointFormEdit.querySelector(`.event__rollup-btn`).addEventListener(`click`, closeButtonClickHandler);

  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), new SiteMenuView().getElement(), RenderPosition.AFTEREND);
render(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), new FilterView().getElement(), RenderPosition.AFTEREND);

render(siteMainElement.querySelector(`.trip-events`), new SortView().getElement(), RenderPosition.BEFOREEND);
const tripPointListComponent = new TripPointListView();
render(siteMainElement.querySelector(`.trip-events`), tripPointListComponent.getElement(), RenderPosition.BEFOREEND);

if (points.length > 0) {
  render(siteHeaderElement, new TripInfoView(pointsSorted).getElement(), RenderPosition.AFTERBEGIN);
  render(siteHeaderElement.querySelector(`.trip-info`), new TripCostView(points).getElement(), RenderPosition.BEFOREEND);

  for (let i = 1; i < TRIP_POINT_COUNT; i++) {
    renderPoint(tripPointListComponent.getElement(), pointsSorted[i]);
  }
} else {
  render(tripPointListComponent.getElement(), new NoTripPoint().getElement(), RenderPosition.BEFOREEND);
}

