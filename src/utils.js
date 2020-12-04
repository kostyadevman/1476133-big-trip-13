import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

export const getFormCreationDate = (date) => {
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

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.insertAdjacentElement(`beforebegin`, element);
      break;
    case RenderPosition.AFTEREND:
      container.insertAdjacentElement(`afterend`, element);
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
