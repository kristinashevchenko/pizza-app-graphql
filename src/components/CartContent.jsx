import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartPizza from "./CartPizza.jsx";
import { Link } from "react-router-dom";

import "../styles/cart.css";
import { clearCart } from "../helpers/cartManager.js";

const CartButton = {
  backgroundColor: "white",
  borderRadius: "30px",
  color: "#D3D3D3",
};

const OrangeCartButton = {
  color: "white",
  borderRadius: "30px",
  border: "1px solid #EB5A1E",
  backgroundColor: "#EB5A1E",
  margin: 0,
};

const CartContent = ({ onSubmit, totalPrice, totalAmount, pizzas }) => {
  const handleClearClick = () => {
    clearCart();
  };

  return (
    <>
      <Box className="cart-header">
        <Typography variant="h4">
          <ShoppingCartIcon /> Корзина
        </Typography>
        <Button
          style={CartButton}
          startIcon={<DeleteIcon />}
          onClick={handleClearClick}
        >
          Очистить корзину
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableBody>
              {pizzas.map((row) => (
                <CartPizza
                  pizza={row}
                  key={`${row.id + row.size + row.dough}`}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Box className="cart-buttons">
          <Box>
            Всего пицц: <b>{totalAmount} шт.</b>
          </Box>
          <Box>
            Сумма заказа:{" "}
            <span className="order-text">{totalPrice} рублей</span>
          </Box>
        </Box>
        <Box className="cart-buttons">
          <Link to="/">
            <button className="cart-buttons__button--back">
              Вернуться назад
            </button>
          </Link>

          <Button style={OrangeCartButton} onClick={onSubmit}>
            Оплатить сейчас
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CartContent;
