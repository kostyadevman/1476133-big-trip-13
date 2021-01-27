export const EventKey = {
  KEY_ESCAPE: `Escape`,
  KEY_ESC: `Esc`
};

export const FilterType = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

export const SortType = {
  DAY: `Day`,
  EVENT: `Event`,
  TIME: `Time`,
  PRICE: `Price`,
  OFFERS: `Offers`
};

export const BLANK_POINT = {
  type: `taxi`,
  timeStart: null,
  timeEnd: null,
  price: 0,
  description: ``,
  destination: ``,
  offers: [],
  photos: [],
  isFavorite: false,
  isDisabled: false,
  isSaving: false,
  isDeleting: false
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`
};
