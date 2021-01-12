import EventNewView from "../view/event-new.js";
import {generateId} from "../mock/trip-point.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class PointNew {
  constructor(tripPointListContainer, changeData) {
    this._tripPointListContainer = tripPointListContainer;
    this._changeData = changeData;

    this._pointNewComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._pointNewComponent !== null) {
      return;
    }

    this._pointNewComponent = new EventNewView();
    this._pointNewComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointNewComponent.setCancelClickHandler(this._handleCancelClick);

    render(this._tripPointListContainer, this._pointNewComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointNewComponent === null) {
      return;
    }

    remove(this._pointNewComponent);
    this._pointNewComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, point)
    );
    this.destroy();
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
