export const tripPointListTemplate = (points) => {
  return `<ul class="trip-events__list">
      ${points.length === 0 ? `<p class="trip-events__msg">Click New Event to create your first point</p>` : `` }
    </ul>`;
};
