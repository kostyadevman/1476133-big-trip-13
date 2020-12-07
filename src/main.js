import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
// import FormCreateView from "./view/form-create.js";
import FormEditView from "./view/form-edit.js";
import TripPointListView from "./view/trip-point-list.js";
import TripPointView from "./view/trip-point.js";
import NoTripPoint from "./view/on-trip-point.js";
import {generateTripPoint} from "./mock/trip-point.js";
import {render, replace, RenderPosition} from "./utils/render.js";

const TRIP_POINT_COUNT = 20;

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
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
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

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  pointEditComponent.setCloseClickHandler(closeButtonClickHandler);

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), new SiteMenuView(), RenderPosition.AFTEREND);
render(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), new FilterView(), RenderPosition.AFTEREND);

render(siteMainElement.querySelector(`.trip-events`), new SortView(), RenderPosition.BEFOREEND);
const tripPointListComponent = new TripPointListView();
render(siteMainElement.querySelector(`.trip-events`), tripPointListComponent, RenderPosition.BEFOREEND);

if (points.length > 0) {
  render(siteHeaderElement, new TripInfoView(pointsSorted), RenderPosition.AFTERBEGIN);
  render(siteHeaderElement.querySelector(`.trip-info`), new TripCostView(points), RenderPosition.BEFOREEND);

  for (let i = 1; i < TRIP_POINT_COUNT; i++) {
    renderPoint(tripPointListComponent.getElement(), pointsSorted[i]);
  }
} else {
  render(tripPointListComponent.getElement(), new NoTripPoint(), RenderPosition.BEFOREEND);
}

