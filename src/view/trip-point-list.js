import {createElement} from "../utils";

const createTripPointListTemplate = (points) => {
  return `<ul class="trip-events__list">
      ${points.length === 0 ? `<p class="trip-events__msg">Click New Event to create your first point</p>` : `` }
    </ul>`;
};

export default class TripPointList {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripPointListTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
