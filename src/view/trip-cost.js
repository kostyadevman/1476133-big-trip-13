const getTotalCost = (tripPoints) => {
  const initialValue = 0;
  return tripPoints.reduce((total, currentValue) => {
      return total + currentValue.price;
  }, initialValue);
};

export const tripCostTemplate = (tripPoints) => {
  const totalCost = getTotalCost(tripPoints);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;
};
