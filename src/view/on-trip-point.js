import {createElement} from "../utils";

export const createNoTripPointTemplate = () => {
  return `<p class="trip-events__msg">
    Click New Event to create your first point
  </p>`;
};

export default class NoTripPoint {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoTripPointTemplate();
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
