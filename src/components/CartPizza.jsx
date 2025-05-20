import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import ClearIcon from "@mui/icons-material/HighlightOff";
import { Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

import "../styles/cart.css";
import imageHelper from "../helpers/imageFormatter";
import {
  decreasePizzaAmount,
  increasePizzaAmount,
  removePizza,
} from "../helpers/cartManager";
import { useMutation } from "@apollo/client";
import { UPDATE_AMOUNT } from "../graphql/updateAmount";

const CircleIcon = {
  color: "#FE5F1E",
};

const CartPizza = ({ pizza }) => {
  const [updateAmount] = useMutation(UPDATE_AMOUNT);
  const handleClearClick = () => {
    removePizza(pizza);
    updateAmount({
      variables: {
        amount: pizza.amount,
      },
    });
  };

  const handlePizzaAdd = () => {
    increasePizzaAmount(pizza);
    updateAmount({
      variables: {
        amount: -1,
      },
    });
  };

  const handlePizzaRemove = () => {
    decreasePizzaAmount(pizza);
    updateAmount({
      variables: {
        amount: 1,
      },
    });
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="center">
        <img
          src={imageHelper(pizza.image)}
          alt="Pizza"
          height="80"
          width="80"
        />
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        <Typography variant="h6">{pizza.name}</Typography>
        <p className="light-text">
          {pizza.dough} dough, {pizza.size} sm.
        </p>
      </StyledTableCell>
      <StyledTableCell align="right">
        <IconButton style={CircleIcon} onClick={handlePizzaRemove}>
          <RemoveIcon />
        </IconButton>
        <span className="bold-text">{pizza.amount}</span>
        <IconButton style={CircleIcon} onClick={handlePizzaAdd}>
          <AddIcon />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell align="right">
        <span className="bold-text">{pizza.price * pizza.amount} р.</span>
      </StyledTableCell>
      <StyledTableCell align="right">
        <IconButton onClick={handleClearClick}>
          <ClearIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CartPizza;
