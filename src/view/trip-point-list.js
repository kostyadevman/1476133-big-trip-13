import {createElement} from "../utils";

const createTripPointListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
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
