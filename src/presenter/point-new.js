import EventNewView from "../view/event-new.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType, EventKey} from "../const.js";

export default class PointNew {
  constructor(tripPointListContainer, offersModel, destinationsModel, changeData) {
    this._tripPointListContainer = tripPointListContainer;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._changeData = changeData;

    this._offers = null;
    this._destinations = null;

    this._pointNewComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;
    if (this._pointNewComponent !== null) {
      return;
    }

    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();

    this._pointNewComponent = new EventNewView(this._offers, this._destinations);
    this._pointNewComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointNewComponent.setCancelClickHandler(this._handleCancelClick);

    render(this._tripPointListContainer, this._pointNewComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointNewComponent === null) {
      return;
    }
    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }
    remove(this._pointNewComponent);
    this._pointNewComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._pointNewComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointNewComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._pointNewComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
  }

  _handleCancelClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === EventKey.KEY_ESCAPE || evt.key === EventKey.KEY_ESC) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
