import AbstractView from "./abstract.js";

export const createAddNewEventTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class AddNewEvent extends AbstractView {
  constructor() {
    super();

    this._addNewEventHandler = this._addNewEventHandler.bind(this);
  }
  getTemplate() {
    return createAddNewEventTemplate();
  }

  _addNewEventHandler() {
    this._callback.addNewEvent();
  }

  setAddClickHandler(callback) {
    this._callback.addNewEvent = callback;
    this.getElement().addEventListener(`click`, this._addNewEventHandler);
  }
}
