import dayjs from "dayjs";

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
