import TripInfoView from "../view/trip-info.js";
import TripCostView from "../view/trip-cost.js";
import {sortPointDay} from "../utils/point";
import {render, RenderPosition, remove} from "../utils/render";

export default class TripInfo {
  constructor(siteHeaderElement, pointsModel) {
    this._siteHeaderElement = siteHeaderElement;
    this._pointsModel = pointsModel;

    this._tripInfoComponent = null;
    this._tripCostComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTripInfo();
  }


  _clearTripInfo() {
    remove(this._tripInfoComponent);
    remove(this._tripCostComponent);
  }

  _renderTripInfo() {
    const points = this._pointsModel.getPoints().sort(sortPointDay);
    this._tripInfoComponent = new TripInfoView(points);
    this._tripCostComponent = new TripCostView(points);

    if (points.length > 0) {
      render(this._siteHeaderElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      render(this._siteHeaderElement.querySelector(`.trip-info`), this._tripCostComponent, RenderPosition.BEFOREEND);
    }
  }

  _handleModelEvent() {
    this._clearTripInfo();
    this._renderTripInfo();
  }
}
