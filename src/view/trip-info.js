import AbstracView from "./abstract.js";
import {getTripInfoDate} from "../utils/point";

const SHOT_FORM_POINT_COUNT = 3;
const getTripRoute = (points) => {
  let tripRoute;
  if (points.length < SHOT_FORM_POINT_COUNT) {
    tripRoute = points.map((item) => item.destination).join(`-`);
  } else {
    tripRoute = `${points[0].destination} - ... - ${points[points.length - 1].destination}`;
  }
  return tripRoute;
};

const getTripRouteDate = (points) => {
  return `${getTripInfoDate(points[0].date)} - ${getTripInfoDate(points[points.length - 1].date)}`;
};

const createTripInfoTemplate = (tripPoints) => {
  const tripRoute = getTripRoute(tripPoints);
  const tripRouteDate = getTripRouteDate(tripPoints);
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripRoute}</h1>

      <p class="trip-info__dates">${tripRouteDate}</p>
    </div>
  </section>`;
};

export default class TripInfo extends AbstracView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}
