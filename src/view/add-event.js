import AbstractView from "./abstract.js";

export const createAddNewEventTemplate = (active) => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${ (!active) ? `disabled` : ``}>New event</button>`;
};

export default class AddNewEvent extends AbstractView {
  constructor(active) {
    super();
    this._active = active;
    this._addNewEventHandler = this._addNewEventHandler.bind(this);
  }
  getTemplate() {
    return createAddNewEventTemplate(this._active);
  }

  _addNewEventHandler() {
    this._callback.addNewEvent();
  }

  setAddClickHandler(callback) {
    this._callback.addNewEvent = callback;
    this.getElement().addEventListener(`click`, this._addNewEventHandler);
  }
}
