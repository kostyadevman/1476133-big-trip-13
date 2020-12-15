import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import TripPointListView from "./view/trip-point-list.js";
import {generateTripPoint} from "./mock/trip-point.js";
import {render, RenderPosition} from "./utils/render.js";

import TripPresenter from "./presenter/trip.js";

const TRIP_POINT_COUNT = 20;

const points = new Array(TRIP_POINT_COUNT).fill().map(generateTripPoint);
const pointsSorted = points.sort((a, b) => {
  return a.date - b.date;
});


const siteHeaderElement = document.querySelector(`.trip-main`);
const siteMainElement = document.querySelector(`.page-main`);

const tripPresenter = new TripPresenter(siteHeaderElement, siteMainElement);
tripPresenter.init(pointsSorted);
// const renderPoint = (pointListElement, point) => {
//   const pointComponent = new TripPointView(point);
//   const pointEditComponent = new EventEditView(point);
//
//
//   const replacePointToForm = () => {
//     replace(pointEditComponent, pointComponent);
//   };
//
//   const replaceFormToPoint = () => {
//     replace(pointComponent, pointEditComponent);
//   };
//
//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       evt.preventDefault();
//       replaceFormToPoint();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };
//
//   const closeButtonClickHandler = () => {
//     replaceFormToPoint();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   };
//
//   pointComponent.setEditClickHandler(() => {
//     replacePointToForm();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });
//
//   pointEditComponent.setFormSubmitHandler(() => {
//     replaceFormToPoint();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });
//
//   pointEditComponent.setCloseClickHandler(closeButtonClickHandler);
//
//   render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
// };
//
render(siteHeaderElement.querySelector(`.trip-controls h2:first-child`), new SiteMenuView(), RenderPosition.AFTEREND);
render(siteHeaderElement.querySelector(`.trip-controls h2:last-child`), new FilterView(), RenderPosition.AFTEREND);

render(siteMainElement.querySelector(`.trip-events`), new SortView(), RenderPosition.BEFOREEND);
const tripPointListComponent = new TripPointListView();
render(siteMainElement.querySelector(`.trip-events`), tripPointListComponent, RenderPosition.BEFOREEND);
//
if (points.length > 0) {
  render(siteHeaderElement, new TripInfoView(pointsSorted), RenderPosition.AFTERBEGIN);
  render(siteHeaderElement.querySelector(`.trip-info`), new TripCostView(points), RenderPosition.BEFOREEND);
}
//
//   pointsSorted.forEach((point) => {
//     renderPoint(tripPointListComponent.getElement(), point);
//   });
//
// } else {
//   render(tripPointListComponent.getElement(), new NoTripPoint(), RenderPosition.BEFOREEND);
// }

