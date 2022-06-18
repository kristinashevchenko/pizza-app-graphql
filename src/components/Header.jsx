import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./../App.css";
import pizza from "../static/pizza.png";
import cart from "../static/cart.svg";
import { useQuery, useSubscription } from "@apollo/client";
import { AMOUNT_SUBSCRIBTION } from "../graphql/amountSubscription";
import { GET_AMOUNT } from "../graphql/getAmount";

const Header = ({ orderNumber, price }) => {
  const { data, loading } = useSubscription(AMOUNT_SUBSCRIBTION);
  const { data: amountData, loading: amountLoading } = useQuery(GET_AMOUNT);

  let amount = 1000;

  if (loading) {
    if (!amountLoading) {
      amount = amountData.amount;
    }
  } else {
    amount = data.amountUpdated;
  }

  console.log(amountData, data, amountLoading, loading);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        style={{ flexDirection: "row" }}
      >
        <Box style={{ display: "flex" }}>
          <img src={pizza} alt="Pizza" style={{ margin: "17px" }} />
          <Box className="title-box">
            <Box className="primary-title">REACT PIZZA</Box>
            <Box className="secondary-title">
              самая вкусная пицца во вселенной
            </Box>
          </Box>
        </Box>
        <Box style={{ display: "flex", alignItems: "center" }}>
          {(!loading || !amountLoading) && <div>{amount} пицц осталось</div>}
          <Link to="/cart">
            <button className="cart-button">
              {price} р. | <img src={cart} alt="cart" /> {orderNumber}
            </button>
          </Link>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
