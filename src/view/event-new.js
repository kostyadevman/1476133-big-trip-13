import {TRIP_POINT_TYPES, TRIP_POINT_DESTINATIONS, BLANK_POINT} from "../const";
import SmartView from "./smart.js";
import {getEventCreationDate, getIcon} from "../utils/point";
import {getOffers, generateDescription, generatePhotos} from "../mock/trip-point.js";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const eventTypeListTemplate = () => {
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

const eventOptionListTemplate = () => {
  return `${TRIP_POINT_DESTINATIONS.map((destination) =>
    `<option value="${destination}"></option>`
  ).join(``)}`;
};

const eventOfferListTemplate = (offers) => {
  return `${offers.length !== 0 ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${offer.selected ? `checked` : ``}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``)}
    </div>
  </section>` : ``}`;
};

const eventPhotoListTemplate = (photos) => {
  return `${photos !== [] ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``)}
        </div>
      </div>` : ``}`;
};

const eventDestinationTemplate = (destination, photos, description) => {
  const photoList = eventPhotoListTemplate(photos);
  return `${destination !== `` ? `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        ${photoList}

      </section>` : ``}`;
};

const createEventEditTemplate = (data) => {
  const {destination, photos, description, timeStart, timeEnd, offers, type, price} = data;

  const eventDestination = eventDestinationTemplate(destination, photos, description);
  const eventStartDate = timeStart !== null ? getEventCreationDate(timeStart) : ``;
  const eventEndDate = timeEnd !== null ? getEventCreationDate(timeEnd) : ``;
  const typeList = eventTypeListTemplate();
  const options = eventOptionListTemplate();
  const offerList = eventOfferListTemplate(offers);
  const icon = getIcon(type);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
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

        ${eventDestination}
      </section>
    </form>
  </li>`;
};

export default class EventNew extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = EventNew.parsePointToData(point);
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._form = this.getElement().querySelector(`form`);

    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startTimeInputHandler = this._startTimeInputHandler.bind(this);
    this._endTimeInputHandler = this._endTimeInputHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._eventDestinationSwitchHandler = this._eventDestinationSwitchHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  removeElement() {
    super.removeElement();
    this._removeDatepickers();
  }

  reset(point) {
    this.updateData(
        EventNew.parsePointToData(point)
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  _removeDatepickers() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  _setDatepickers() {
    this._removeDatepickers();
    this._datepickerStart = flatpickr(

        this.getElement().querySelector(`input[name=event-start-time]`),
        {
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.timeStart,
          enableTime: true,
          onChange: this._startTimeInputHandler
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`input[name=event-end-time]`),
        {
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.timeEnd,
          enableTime: true,
          onChange: this._endTimeInputHandler
        }
    );
  }


  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCancelClickHandler(this._callback.closeClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`click`, this._eventTypeToggleHandler);

    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._eventDestinationSwitchHandler);

    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);

    this.getElement()
      .querySelector(`input[name=event-start-time]`)
      .addEventListener(`input`, this._startTimeInputHandler);

    this.getElement()
      .querySelector(`input[name=event-end-time]`)
      .addEventListener(`input`, this._endTimeInputHandler);

    const offersElement = this.getElement().querySelector(`.event__available-offers`);
    if (offersElement !== null) {
      offersElement.addEventListener(`change`, this._offersChangeHandler);
    }
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`event__type-label`)) {
      const type = evt.target.innerText;
      // TODO get from API
      const offers = getOffers(type, true);

      this.updateData({
        type,
        offers
      });
    }
  }

  _eventDestinationSwitchHandler(evt) {
    evt.preventDefault();
    const destination = evt.target.value;
    let description = ``;
    let photos = [];

    if (TRIP_POINT_DESTINATIONS.includes(destination)) {
      // TODO get from API
      description = generateDescription();
      photos = generatePhotos();
    }

    this.updateData({
      destination,
      description,
      photos
    });
  }

  _validatePrice() {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    const priceElem = this.getElement().querySelector(`.event__input--price`);
    priceElem.setCustomValidity(``);

    if (!isNumeric(priceElem.value)) {
      priceElem.setCustomValidity(`Numbers only`);
    }
  }

  // _validateDestination() {
  //   const DestinationElem = this._form.querySelector(`.event__input--destination`);
  //   DestinationElem.setCustomValidity(``);
  //   console.log(TRIP_POINT_DESTINATIONS);
  //   if (!TRIP_POINT_DESTINATIONS.includes(DestinationElem.value)) {
  //     DestinationElem.setCustomValidity(`Choose destination from list below`);
  //   }
  // }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this._validatePrice();
    this.updateData({
      price: Number(evt.target.value)
    }, true);
  }

  _startTimeInputHandler([userDate]) {
    this.updateData({
      timeStart: userDate
    }, true);
    this.updateData({
      date: userDate
    }, true);
  }

  _endTimeInputHandler([userDate]) {
    this.updateData({
      timeEnd: userDate
    }, true);
  }

  _offersChangeHandler(evt) {
    this.updateData({
      offers: Object.assign(
          {},
          this._data.offers,
          {[evt.target.dataset.value]: Object.assign(
              {},
              this._data.offers[evt.target.dataset.value],
              {selected: evt.target.checked}
          )}
      )
    }, true);

  }

  _cancelClickHandler(evt) {
    evt.preventDefault();
    this._removeDatepickers();
    this._callback.cancelClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._removeDatepickers();
    this._callback.formSubmit(EventNew.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    // this._validateDestination();
    this._validatePrice();
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._cancelClickHandler);
  }

  static parsePointToData(point) {
    let data = Object.assign({}, point);
    data.offers = point.offers.slice();
    return data;
  }

  static parseDataToPoint(data) {
    return Object.assign({}, data);
  }
}
