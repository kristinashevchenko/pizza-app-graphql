import { cartVar } from "../graphql/init";

const increasePizzaAmount = (pizza) => {
  const { items, price } = cartVar();

  cartVar({
    items: items.map((item) => {
      if (
        item.id === pizza.id &&
        item.size === pizza.size &&
        item.dough === pizza.dough
      ) {
        return {
          ...item,
          amount: item.amount + 1,
        };
      }
      return item;
    }),
    price: parseFloat((price + pizza.price).toFixed(2)),
  });
};

const addPizza = (pizza) => {
  const { items, price } = cartVar();

  const { id, size, dough } = pizza;
  const oldPizza = items.find(
    (item) => item.id === id && item.size === size && item.dough === dough
  );
  if (!oldPizza) {
    cartVar({
      items: [
        ...items,
        {
          ...pizza,
          amount: 1,
        },
      ],
      price: parseFloat((price + pizza.price).toFixed(2)),
    });
  } else {
    increasePizzaAmount(oldPizza);
  }
};

const removePizza = (pizza) => {
  const { items, price } = cartVar();

  cartVar({
    items: items.filter(
      (item) =>
        !(
          item.id === pizza.id &&
          item.size === pizza.size &&
          item.dough === pizza.dough
        )
    ),
    price: parseFloat((price - pizza.price).toFixed(2)),
  });
};

const decreasePizzaAmount = (pizza) => {
  const { items, price } = cartVar();

  cartVar({
    items: items
      .map((item) => {
        if (
          item.id === pizza.id &&
          item.size === pizza.size &&
          item.dough === pizza.dough
        ) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      })
      .filter((pizza) => pizza.amount > 0),
    price: parseFloat((price - pizza.price).toFixed(2)),
  });
};
const clearCart = () => {
  cartVar({ items: [], price: 0 });
};

export {
  addPizza,
  increasePizzaAmount,
  decreasePizzaAmount,
  removePizza,
  clearCart,
};
