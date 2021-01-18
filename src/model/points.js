import Observer from "../utils/observer.js";
// import {getRandomInteger} from "../utils/common";
import {generateId} from "../mock/trip-point";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          date: point.date_from,
          timeStart: point.date_from,
          timeEnd: point.date_to,
          price: point.base_price,
          description: point.destination.description,
          photos: point.destination.pictures,
          destination: point.destination.name,
          offers: point.offers.map((offer) => Object.assign(offer, {selected: true, id: generateId()})),
          isFavorite: point.is_favorite
        }
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "date_from": point.timeStart,
          "date_to": point.timeEnd,
          "is_favorite": point.isFavorite,
          "base_price": point.price,
          "destination": Object.assign(
              {},
              {
                name: point.destination,
                description: point.description,
                pictures: point.photos
              }
          ),
          "offers": point.offers.filter((offer) => offer.selected === true) || []
        }
    );

    delete adaptedPoint.date;
    delete adaptedPoint.timeStart;
    delete adaptedPoint.timeEnd;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.price;
    delete adaptedPoint.description;
    delete adaptedPoint.photos;

    return adaptedPoint;
  }
}
