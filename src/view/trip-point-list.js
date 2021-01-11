import AbstracView from "./abstract.js";

const createTripPointListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripPointList extends AbstracView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripPointListTemplate();
  }
}
