export const filterPrice = (prices, currency) => {
  return prices.filter((price) => price.currency.label === currency.label)[0];
};
