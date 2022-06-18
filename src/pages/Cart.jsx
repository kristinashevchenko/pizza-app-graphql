import React from "react";
import { useMutation, useReactiveVar, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import EmptyCartContent from "../components/EmptyCartContent.jsx";
import "../styles/cart.css";
import { CREATE_ORDER } from "../graphql/createOrder.js";
import CartContent from "../components/CartContent";
import { clearCart } from "../helpers/cartManager.js";
import { cartVar } from "../graphql/init";

const Cart = () => {
  const [createOrder] = useMutation(CREATE_ORDER, {
    update: (cache, { data: { createOrder } }) => {
      cache.modify({
        fields: {
          orders(existingOrders = []) {
            const newTodoRef = cache.writeFragment({
              data: createOrder,
              fragment: gql`
                fragment NewOrder on Order {
                  id
                  totalPrice
                  totalAmount
                  orderedPizzas
                }
              `,
            });
            return [...existingOrders, newTodoRef];
          },
        },
      });
    },
  });
  const cart = useReactiveVar(cartVar);

  const { items, price } = cart;
  const totalAmount = items.reduce((count, pizza) => pizza.amount + count, 0);

  const handleSubmit = () => {
    const order = {
      totalPrice: price,
      totalAmount: +totalAmount,
      orderedPizzas: items.map((pizza) => ({
        dough: pizza.dough,
        size: pizza.size,
        price: pizza.price,
        amount: pizza.amount,
        pizzaName: pizza.name,
      })),
    };
    createOrder({
      variables: { ...order },
      optimisticResponse: {
        createOrder: {
          id: "123",
          __typename: "Order",
          totalPrice: price,
          totalAmount,
          orderedPizzas: [],
        },
      },
    });
    clearCart();
  };

  return (
    <Box className="cart-container">
      {!items.length ? (
        <EmptyCartContent />
      ) : (
        <CartContent
          onSubmit={handleSubmit}
          totalAmount={totalAmount}
          totalPrice={price}
          pizzas={items}
        />
      )}
      <Link to="/orders">
        <button className="cart-buttons__button--red">К заказам</button>
      </Link>
    </Box>
  );
};

export default Cart;
