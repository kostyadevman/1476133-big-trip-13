import {getRandomInteger} from "../utils/common.js";
import dayjs from "dayjs";
import {nanoid} from 'nanoid';

import {TRIP_POINT_TYPES, TRIP_POINT_DESTINATIONS} from "../const";

const PHOTO_COUNT_MAX = 20;
const OFFER_COUNT = 20;
const POINT_OFFER_COUNT_MAX = 5;
const PRICE_MAX = 120;

const generateType = () => {
  const tripPointTypes = TRIP_POINT_TYPES;

  const randomIndex = getRandomInteger(0, tripPointTypes.length - 1);

  return tripPointTypes[randomIndex];
};

const generateDestination = () => {
  const destinations = TRIP_POINT_DESTINATIONS;

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generatePrice = () => {
  return getRandomInteger(0, PRICE_MAX);
};

const generateOffers = () => {
  const offerTitles = [
    `Order Uber`,
    `Add luggage`,
    `Switch to comfort`,
    `Rent a car`,
    `Add breakfast`,
    `Book tickets`,
    `Lunch in city`
  ];
  const generateTitle = () => {
    const randomIndex = getRandomInteger(0, offerTitles.length - 1);

    return offerTitles[randomIndex];
  };

  const generateOffer = () => {
    return {
      id: nanoid(),
      type: generateType(),
      title: generateTitle(),
      price: generatePrice()
    };
  };

  return new Array(OFFER_COUNT).fill().map(generateOffer);
};

const offers = generateOffers();

const getOffers = (type) => {
  const offerCount = getRandomInteger(0, POINT_OFFER_COUNT_MAX);
  return offers.filter((item) => item.type === type).slice(0, offerCount) || [];
};

const generatePhotos = () => {
  const photos = [];
  const getPhoto = () => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  };

  for (let i = 1; i < getRandomInteger(0, PHOTO_COUNT_MAX); i++) {
    photos.push(getPhoto());
  }
  return photos;
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};

const addDuration = (date) => {
  const maxHourDuration = 24;
  const maxMinuteDuration = 60;

  return dayjs(date).add(getRandomInteger(0, maxHourDuration), `hour`)
    .add(getRandomInteger(0, maxMinuteDuration), `minute`).toDate();
};

export const generateTripPoint = () => {
  const type = generateType();
  const date = generateDate();
  const timeStart = addDuration(date);
  const timeEnd = addDuration(timeStart);
  return {
    type,
    date,
    timeStart,
    timeEnd,
    price: generatePrice(),
    description: generateDescription(),
    destination: generateDestination(),
    offers: getOffers(type),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    photos: generatePhotos()
  };
};
