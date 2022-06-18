export const SERVER_URL = "http://localhost:3001";
export const WS_URL = "ws://localhost:3001";

const MEAT = "meat";
const HOT = "hot";
const VEGAN = "vegan";
const GRILL = "grill";
const CLOSE = "close";
export const ALL = "all";
export const FILTERS = [ALL, MEAT, VEGAN, GRILL, HOT, CLOSE];
export const FILTER_NAMES = {
  [ALL]: "Все",
  [MEAT]: "Мясные",
  [HOT]: "Острые",
  [VEGAN]: "Вегетарианская",
  [GRILL]: "Гриль",
  [CLOSE]: "Закрытые",
};

export const POPULARITY = "popularity";
export const PRICE = "price";
export const ALPHABET = "alphabet";
export const SORTS = [POPULARITY, PRICE, ALPHABET];
export const SORT_NAMES = {
  [POPULARITY]: "популярности",
  [PRICE]: "цене",
  [ALPHABET]: "алфавиту",
};

export const DOUGH_NAMES = {
  thin: "Тонкое",
  thick: "Толстое",
};
