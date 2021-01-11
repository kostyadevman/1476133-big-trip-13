import {FilterType} from "../const.js";
import {isEventFuture, isEventPast} from "./point.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventFuture(point.date)),
  [FilterType.PAST]: (points) => points.filter((point) => isEventPast(point.date)),
};
