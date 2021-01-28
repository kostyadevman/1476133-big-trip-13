import SmartView from "./smart.js";
import {getEventCreationDate, getIcon} from "../utils/point.js";
import {getOffersByType} from "../utils/point";
import dayjs from "dayjs";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import {BLANK_POINT} from "../const.js";


const eventTypeListTemplate = (types, typeSelected, isDisabled) => {
  return `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${types.map((type) => `
      <div class="event__type-item">
        <input
            id="event-type-${type.toLowerCase()}-1"
            class="event__type-input  visually-hidden"
            type="radio" name="event-type"
            value="${type.toLowerCase()}"
            ${isDisabled ? `disabled` : ``}
            ${type === typeSelected ? `checked` : ``}
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

const eventOptionListTemplate = (destinations) => {
  return `${destinations.map((destination) =>
    `<option value="${destination}"></option>`
  ).join(``)}`;
};

const eventOfferListTemplate = (offers, isDisabled) => {

  return `${offers.length !== 0 ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offers.map((offer, index) => `<div class="event__offer-selector">
        <input
            class="event__offer-checkbox  visually-hidden"
            data-value="${index}" id="${index}"
            type="checkbox"
            name="event-offer-${index}"
            ${offer.selected ? `checked` : ``}
            ${isDisabled ? `disabled` : ``}
        >
        <label class="event__offer-label" for="${index}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``)}
    </div>
  </section>` : ``}`;
};

const eventPhotoListTemplate = (photos) => {
  return `${ typeof photos !== `undefined` && photos.length !== 0 ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join(``)}
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

const createEventEditTemplate = (data, offersAll, destinations) => {
  const {destination, photos, description, type, price, timeStart, timeEnd, isDisabled, isSaving} = data;

  const offersByTypeAll = getOffersByType(offersAll, type);
  const eventDestination = eventDestinationTemplate(destination, photos, description);
  const eventStartDate = getEventCreationDate(dayjs(timeStart));
  const eventEndDate = getEventCreationDate(dayjs(timeEnd));
  const typeList = eventTypeListTemplate(offersAll.map((offer) => offer.type), type, isDisabled);
  const options = eventOptionListTemplate(destinations);
  const offerList = eventOfferListTemplate(offersByTypeAll, isDisabled);
  const icon = getIcon(type);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${icon}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>

          ${typeList}

        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${destination}"
            list="destination-list-1"
            autocomplete="off"
            ${isDisabled ? `disabled` : ``}
          >
          <datalist id="destination-list-1">
              ${options}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time">From</label>
          <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${eventStartDate}" ${isDisabled ? `disabled` : ``}>
          &mdash;
          <label class="visually-hidden" for="event-end-time">To</label>
          <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${eventEndDate}" ${isDisabled ? `disabled` : ``}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden"></span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="${price ? price : `0`}" autocomplete="off" ${isDisabled ? `disabled` : ``}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>
            ${ isSaving ? `Saving...` : `Save` }
        </button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``} >Cancel</button>
      </header>
      <section class="event__details">
        ${offerList}

        ${eventDestination}
      </section>
    </form>
  </li>`;
};

export default class EventNew extends SmartView {
  constructor(offers, destinations, point = BLANK_POINT) {
    super();

    this._offers = offers;
    this._destinations = destinations;
    this._data = this._parsePointToData(point);
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startTimeInputHandler = this._startTimeInputHandler.bind(this);
    this._endTimeInputHandler = this._endTimeInputHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._eventDestinationSwitchHandler = this._eventDestinationSwitchHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setData();
    this._setInnerHandlers();
    this._setDatepickers();
  }

  removeElement() {
    super.removeElement();
    this._removeDatepickers();
  }

  reset(point) {
    this.updateData(
        this._parsePointToData(point)
    );
  }

  getTemplate() {
    return createEventEditTemplate(
        this._data,
        this._offers,
        this._destinations.map((destination) => destination.name)
    );
  }

  setFormSubmitHandler(callback) {
    this._validateDestination();
    this._validatePrice();
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._cancelClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCancelClickHandler(this._callback.cancelClick);
  }

  _getDestinationByName(name) {
    return this._destinations.find((item) => item.name === name);
  }

  _setData() {
    const timeStart = dayjs(new Date());
    const timeEnd = dayjs(new Date());

    this.updateData({
      timeStart,
      timeEnd
    }, true);
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
          onChange: this._startTimeInputHandler,
          minDate: `today`,
          maxDate: `today`,
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`input[name=event-end-time]`),
        {
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.timeEnd,
          enableTime: true,
          onChange: this._endTimeInputHandler,
          minDate: `today`,
        }
    );
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

    const offersElement = this.getElement().querySelector(`.event__available-offers`);
    if (offersElement !== null) {
      offersElement.addEventListener(`change`, this._offersChangeHandler);
    }
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    const offers = [];

    if (evt.target.classList.contains(`event__type-label`)) {
      const type = evt.target.innerText.toLowerCase();

      this.updateData({
        type,
        offers
      });
    }
  }

  _eventDestinationSwitchHandler(evt) {
    evt.preventDefault();
    let destination = evt.target.value;
    let description = null;
    let photos = null;
    let destinationByName = null;

    this._validateDestination();
    if (!this._destinations.map((item) => item.name).includes(destination)) {
      return;
    }

    destinationByName = this._getDestinationByName(destination);
    destination = destinationByName.name;
    description = destinationByName.description;
    photos = destinationByName.pictures;

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

  _validateDestination() {
    const DestinationElem = this.getElement().querySelector(`.event__input--destination`);
    DestinationElem.setCustomValidity(``);
    if (!this._destinations.map((item) => item.name).includes(DestinationElem.value)) {
      DestinationElem.setCustomValidity(`Choose destination from list below`);
    }
  }

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

    this._datepickerEnd.set(`minDate`, this._data.timeStart);
  }

  _endTimeInputHandler([userDate]) {
    this.updateData({
      timeEnd: userDate
    }, true);

    this._datepickerStart.set(`maxDate`, this._data.timeEnd);
  }

  _offersChangeHandler() {
    const offersByTypeAll = getOffersByType(this._offers, this._data.type);
    const offersElem = Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox`));
    const offersSelectedInxs = offersElem.filter((offer) => offer.checked).map((item) => item.dataset.value);
    const offers = offersSelectedInxs.map((inx) => offersByTypeAll[inx]);
    this.updateData({
      offers,
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
    this._callback.formSubmit(this._parseDataToPoint(this._data));
  }

  _parsePointToData(point) {
    const data = Object.assign({}, point);
    data.offers = point.offers.slice();
    return data;
  }

  _parseDataToPoint(data) {
    return Object.assign({}, data);
  }
}
