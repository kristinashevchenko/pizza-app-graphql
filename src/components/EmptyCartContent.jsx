import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import vector from "../static/vector.png";
import "../styles/cart.css";

const EmptyCartContent = () => {
  return (
    <Box className="empty-cart">
      <Box className="empty-cart-item-1">
        <Typography
          variant="h5"
          gutterBottom={true}
          style={{ fontWeight: "bold" }}
        >
          The cart is empty😕
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          className="empty-cart-subtitle"
        >
          It is likely that you have not ordered pizza yet. To order pizza, go to the main page.
        </Typography>
      </Box>
      <Box className="empty-cart-item-2">
        <img src={vector} alt="Cart" className="empty-cart-img" />
        <Link to="/">
          <button className="cart-buttons__button--empty-back">
            Go back
          </button>
        </Link>
      </Box>
    </Box>
  );
};

export default EmptyCartContent;
