import TripInfoView from "../view/trip-info.js";
import TripCostView from "../view/trip-cost.js";
import SiteMenuView from "../view/site-menu.js";
import FilterView from "../view/filter.js";
import SortView from "../view/sort.js";
import TripPointListView from "../view/trip-point-list.js";
import NoTripPoint from "../view/on-trip-point.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

import PointPresenter from "../presenter/point.js";


export default class Trip {
  constructor(siteHeaderElement, siteMainElement) {
    this._pointPresenter = {};
    this._siteHeaderElement = siteHeaderElement;
    this._siteMainElement = siteMainElement;

    this._siteMenuComponent = new SiteMenuView();
    this._filterComponent = new FilterView();
    this._sortComponent = new SortView();
    this._tripPointListComponent = new TripPointListView();
    this._noTripPointComponent = new NoTripPoint();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._tripPoints = points.slice();
    // this._renderTripInfo();
    // this._renderTripCost();
    // this._renderSiteMenu();
    // this._renderFilter();
    // this._renderSort();
    this._renderPointList();
    this._renderPoints();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderTripInfo() {
    if (this._tripPoints.length > 0) {
      this._tripInfoComponent = new TripInfoView(this._tripPoints);
      render(this._siteHeaderElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _renderTripCost() {
    if (this._tripPoints.length > 0) {
      this._tripCostComponent = new TripCostView(this._tripPoints);
      render(this._siteHeaderElement.querySelector(`.trip-info`), this._tripCostComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderSiteMenu() {
    render(this._siteHeaderElement.querySelector(`.trip-controls h2:first-child`), this._siteMenuComponent, RenderPosition.AFTEREND);
  }

  _renderFilter() {
    render(this._siteHeaderElement.querySelector(`.trip-controls h2:last-child`), this._filterComponent, RenderPosition.AFTEREND);
  }

  _renderSort() {
    render(this._siteMainElement.querySelector(`.trip-events`), this._sortComponent, RenderPosition.BEFOREEND);
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderPointList() {
    render(this._siteMainElement.querySelector(`.trip-events`), this._tripPointListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripPointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderPoints() {
    if (this._tripPoints.length > 0) {
      this._tripPoints.forEach((point) => {
        this._renderPoint(point);
      });
    } else {
      this._renderNoPoints();
    }
  }

  _renderNoPoints() {
    render(this._tripPointListComponent.getElement(), this._noTripPointComponent, RenderPosition.BEFOREEND);
  }

}
