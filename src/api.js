
// import OffersModel from "./model/offers.js";
// import DestinationModel from "./model/destinations.js";
import {adaptToClient, adaptToServer} from "./utils/point.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON);
  }

  _getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  getAllData() {
    const pOffers = this._getOffers();
    // .then((offers) => OffersModel.setOffers(offers));
    const pDestination = this._getDestinations();
    // .then((destinations) => DestinationModel.setDestinations(destinations));
    const pPoinsts = this._getPoints();

    const promise = Promise.all([pOffers, pDestination, pPoinsts]);

    return promise;
  }

  _getPoints() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((points) => points.map(adaptToClient));
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
  }

  addPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(adaptToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
