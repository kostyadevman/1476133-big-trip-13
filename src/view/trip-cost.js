import AbstracView from "./abstract.js";

const getTotalCost = (tripPoints) => {
  const initialValue = 0;
  return tripPoints.reduce((total, currentValue) => {
    return total + Number(currentValue.price);
  }, initialValue);
};

const createTripCostTemplate = (tripPoints) => {
  const totalCost = getTotalCost(tripPoints);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;
};

export default class TripCost extends AbstracView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
