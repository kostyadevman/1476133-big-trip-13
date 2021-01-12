export const TRIP_POINT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const TRIP_POINT_DESTINATIONS = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `London`,
  `Paris`,
];

export const FILTERS = [
  `Everything`,
  `Future`,
  `Past`
];

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

export const MENU_ITEMS = [
  `Table`,
  `Stats`
];

export const BLANK_POINT = {
  type: `Taxi`,
  timeStart: null,
  timeEnd: null,
  price: null,
  description: ``,
  destination: ``,
  offers: [],
  photos: []
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};
