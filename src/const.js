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

export const SORTS = [
  `Day`,
  `Event`,
  `Time`,
  `Price`,
  `Offers`
];

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
