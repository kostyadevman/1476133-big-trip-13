import SortView from "../view/sort.js";
import TripPointListView from "../view/trip-point-list.js";
import NoTripPoint from "../view/no-trip-point.js";
import LoadingView from "../view/loading.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {filter} from "../utils/filter.js";
import {sortPointDay, sortPointPrice, sortPointTime} from "../utils/point.js";

import PointPresenter from "../presenter/point.js";
import PointNewPresenter from "../presenter/point-new.js";


export default class Trip {
  constructor(siteMainElement, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._pointPresenter = {};
    this._pointNewPresenter = null;
    this._currentSortType = SortType.DAY;
    this._siteMainElement = siteMainElement;
    this._isLoading = true;
    this._api = api;

    this._addEventComponent = null;
    this._sortComponent = null;
    this._tripPointListComponent = null;
    this._noTripPointComponent = null;
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTripEvents();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort(sortPointPrice);
      case SortType.TIME:
        return filtredPoints.sort(sortPointTime);
      case SortType.DAY:
        return filtredPoints.sort(sortPointDay);
    }

    return filtredPoints;
  }

  _handleModeChange() {
    if (this._pointNewPresenter !== null) {
      this._pointNewPresenter.destroy();
    }
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._siteMainElement.querySelector(`.trip-events`), this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripEvents();
        this._renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this._clearTripEvents({resetSortType: true});
        this._renderTripEvents();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTripEvents();
        break;
    }
  }

  createNewPoint(callback) {
    if (this._noTripPointComponent !== null) {
      remove(this._noTripPointComponent);
    }

    if (this._tripPointListComponent === null) {
      this._renderPointList();
    }

    this._pointNewPresenter = new PointNewPresenter(this._tripPointListComponent, this._handleViewAction);
    this._pointNewPresenter.init(callback);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTripEvents();
    this._renderTripEvents();
  }

  _renderPointList() {
    if (this._tripPointListComponent !== null) {
      this._tripPointListComponent = null;
    }

    this._tripPointListComponent = new TripPointListView();
    render(this._siteMainElement.querySelector(`.trip-events`), this._tripPointListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripPointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    const points = this._getPoints();
    points.forEach((point) => this._renderPoint(point));
  }

  _renderLoading() {
    render(this._siteMainElement, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    if (this._noTripPointComponent !== null) {
      this._noTripPointComponent = null;
    }

    this._noTripPointComponent = new NoTripPoint();
    render(this._siteMainElement.querySelector(`.trip-events`), this._noTripPointComponent, RenderPosition.BEFOREEND);
  }

  _clearTripEvents({resetSortType = false} = {}) {
    if (this._pointNewPresenter !== null) {
      this._pointNewPresenter.destroy();
    }

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());

    this._pointPresenter = {};

    remove(this._addEventComponent);
    remove(this._sortComponent);
    remove(this._noTripPointComponent);
    remove(this._tripPointListComponent);
    remove(this._loadingComponent);

    this._tripPointListComponent = null;

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTripEvents() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();

    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderPointList();
    this._renderPoints();
    this._renderSort();

  }

  destroy() {
    this._clearTripEvents({resetSortType: true});

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

}
