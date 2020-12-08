import {TRIP_POINT_TYPES, TRIP_POINT_DESTINATIONS, BLANK_POINT} from "../const";
import AbstracView from "./abstract.js";
import {getFormCreationDate, getIcon} from "../utils/point";

const formTypeListTemplate = () => {
  return `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${TRIP_POINT_TYPES.map((type) => `
      <div class="event__type-item">
        <input
            id="event-type-${type.toLowerCase()}-1"
            class="event__type-input  visually-hidden"
            type="radio" name="event-type"
            value="${type.toLowerCase()}"
        >
        <label
            class="event__type-label  event__type-label--${type.toLowerCase()}"
            for="event-type-${type.toLowerCase()}-1"
            >${type}</label
        >
      </div>`).join(``)}
    </fieldset>
  </div>`;
};

const formOptionListTemplate = () => {
  return `${TRIP_POINT_DESTINATIONS.map((destination) =>
    `<option value="${destination}"></option>`
  ).join(``)}`;
};

const formOfferListTemplate = (offers) => {
  return `${offers.length !== 0 ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}">
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``)}
    </div>
  </section>` : ``}`;
};

const formPhotoListTemplate = (photos) => {
  return `${photos !== [] ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``)}
        </div>
      </div>` : ``}`;
};

const formDestinationTemplate = (destination, photos, description) => {
  const photoList = formPhotoListTemplate(photos);
  return `${destination !== `` ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        ${photoList}

      </section>` : ``}`;
};

export const createFormCreateTemplate = (point) => {
  const {destination, photos, description, timeStart, timeEnd, offers, type, price} = point;

  const formDestination = formDestinationTemplate(destination, photos, description);
  const eventStartDate = timeStart !== null ? getFormCreationDate(timeStart) : ``;
  const eventEndDate = timeEnd !== null ? getFormCreationDate(timeEnd) : ``;
  const typeList = formTypeListTemplate();
  const options = formOptionListTemplate();
  const offerList = formOfferListTemplate(offers);
  const icon = getIcon(type);

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="${icon}" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        ${typeList}

      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
            ${options}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndDate}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">${price}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price ? price : ``}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      ${offerList}

      ${formDestination}
    </section>
  </form>`;
};

export default class FormCreate extends AbstracView {
  constructor(point = BLANK_POINT) {
    super();
    this._point = point;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createFormCreateTemplate(this._point);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
  }
}
