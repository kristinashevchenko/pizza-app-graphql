import { ALPHABET, POPULARITY, PRICE } from "../contants";

const priceSort = (order) => (pizza1, pizza2) => {
  const p1 = pizza1.modifications[0].price || 0;
  const p2 = pizza2.modifications[0].price || 0;
  if (p1 < p2) return order;
  else if (p1 > p2) return -1 * order;
  return 0;
};

const nameSort = (order) => (pizza1, pizza2) => {
  if (pizza1.name < pizza2.name) return order;
  else if (pizza1.name > pizza2.name) return -1 * order;
  return 0;
};
const popularitySort = (order) => (pizza1, pizza2) => {
  const p1 = pizza1.popularity || 0;
  const p2 = pizza2.popularity || 0;
  if (p1 < p2) return order;
  else if (p1 > p2) return -1 * order;
  return 0;
};

export const sortHelper = {
  [POPULARITY]: popularitySort,
  [ALPHABET]: nameSort,
  [PRICE]: priceSort,
};
