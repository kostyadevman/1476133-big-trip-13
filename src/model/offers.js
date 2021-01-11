import Observer from "../utils/observer.js";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = {};
  }

  setOffers(offers) {
    this.offers = offers.slice();
  }

  getOffers(type) {
    return this._offers.find((offer) => offer.type === type);
  }
}
