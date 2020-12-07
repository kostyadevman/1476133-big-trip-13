import AbstracView from "./abstract.js";

const createTripPointListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripPointList extends AbstracView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripPointListTemplate(this._points);
  }
}
