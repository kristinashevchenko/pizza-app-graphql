import React from "react";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

import "../styles/cart.css";

const CartOrder = ({ order }) => {
  const { totalAmount, totalPrice } = order;

  return (
    <StyledTableRow>
      <StyledTableCell align="center">
        <span className="bold-text">{totalPrice}</span>
      </StyledTableCell>
      <StyledTableCell align="center">
        <span className="bold-text">{totalAmount}</span>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CartOrder;
