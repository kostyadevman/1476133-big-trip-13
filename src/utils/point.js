import dayjs from "dayjs";
import {generateId} from "../mock/trip-point";

export const humanizePointEventDate = (date) => {
  return dayjs(date).format(`MMM DD`);
};

export const humanizePointEventTime = (dateTime) => {
  return dayjs(dateTime).format(`HH:mm`);
};

export const getIcon = (type) => {
  return ``.concat(`img/icons/`, type.toLowerCase(), `.png`);
};

export const getDateToAttribute = (date) => {
  return dayjs(date).format(`YYYY-MM-DDTHH:mm`);
};

export const getEventCreationDate = (date) => {
  return dayjs(date).format(`DD/MM/YYYY HH:mm`);
};

export const getTripInfoDate = (date) => {
  return dayjs(date).format(`DD MMM`);
};

export const getDuration = (start, end) => {
  let duration = ``;
  const dayDuration = dayjs(end).diff(dayjs(start), `day`);
  const hourDuration = dayjs(end).diff(dayjs(start), `hour`) % 24;
  const minuteDuration = dayjs(end).diff(dayjs(start), `minute`) % 60;
  duration += dayDuration ? dayDuration.toString().padStart(2, `0`) + `D ` : ``;
  duration += (dayDuration || hourDuration) ? hourDuration.toString().padStart(2, `0`) + `H ` : ``;
  duration += minuteDuration ? minuteDuration.toString().padStart(2, `0`) + `M ` : ``;
  return duration;
};

export const sortPointDay = (pointA, pointB) => {
  return dayjs(pointA.date) - dayjs(pointB.date);
};

export const sortPointPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortPointTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.timeStart).diff(dayjs(pointA.timeEnd), `minute`);
  const durationB = dayjs(pointB.timeStart).diff(dayjs(pointB.timeEnd), `minute`);
  return durationA - durationB;
};


export const isEventFuture = (eventDate) => {
  return eventDate === null ? false : dayjs().isBefore(eventDate, `D`) || dayjs().isSame(eventDate, `D`);
};

export const isEventPast = (eventDate) => {
  return eventDate === null ? false : dayjs().isAfter(eventDate, `D`);
};

export const adaptToClient = (point) => {
  const adaptedPoint = Object.assign(
      {},
      point,
      {
        date: point.date_from,
        timeStart: point.date_from,
        timeEnd: point.date_to,
        price: point.base_price,
        description: point.destination.description,
        photos: point.destination.pictures,
        destination: point.destination.name,
        offers: point.offers.map((offer) => Object.assign(offer, {selected: true, id: generateId()})),
        isFavorite: point.is_favorite
      }
  );

  delete adaptedPoint.date_from;
  delete adaptedPoint.date_to;
  delete adaptedPoint.base_price;
  delete adaptedPoint.is_favorite;

  return adaptedPoint;
};
