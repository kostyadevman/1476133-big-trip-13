import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
dayjs.extend(isBetween);

export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointsByType = (points, type) => {
  return points.filter((point) => point.type === type).length;
};

export const moneyByType = (points, type) => {
  return points.reduce((total, point) => {
    if (point.type === type) {
      return total + Number(point.price);
    }

    return total;
  }, 0);
};

const getDutation = (start, end) => {
  return dayjs(end).diff(dayjs(start));
};

export const timeByType = (points, type) => {
  const time = points.reduce((total, point) => {
    if (point.type === type) {
      return total + getDutation(point.timeStart, point.timeEnd);
    }

    return total;
  }, 0);
  return Math.ceil(dayjs.duration(time).asDays());
};

