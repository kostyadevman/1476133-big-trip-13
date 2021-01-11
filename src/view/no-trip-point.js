import AbstractView from "./abstract.js";

export const createNoTripPointTemplate = () => {
  return `<p class="trip-events__msg">
    Click New Event to create your first point
  </p>`;
};

export default class NoTripPoint extends AbstractView {
  getTemplate() {
    return createNoTripPointTemplate();
  }
}
