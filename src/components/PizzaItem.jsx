import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { uniq, get } from "lodash";
import { useReactiveVar } from "@apollo/client";
import "../styles/pizza.css";
import PizzaItemToggle from "./PizzaItemToggle.jsx";
import imageHelper from "../helpers/imageFormatter";
import { cartVar } from "../graphql/init";

const getPizzaAmount = (items = [], id) => {
  return items.reduce((amount, pizza) => {
    if (id === pizza.id) {
      return amount + pizza.amount;
    }
    return amount;
  }, 0);
};

const PizzaItem = ({ pizza, row, column, addPizza }) => {
  const { name, modifications = [], image } = pizza;
  const cart = useReactiveVar(cartVar);

  const amount = getPizzaAmount(cart?.items, pizza.id);
  const sizes = uniq(modifications.map((mod) => mod.size));
  const dough = uniq(modifications.map((mod) => mod.dough));

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedDough, setSelectedDought] = useState(dough[0]);
  const price = get(
    modifications.find(
      (mod) => mod.size === selectedSize && mod.dough === selectedDough
    ),
    "price",
    0
  );

  const handleDoughSelect = (newDough) => setSelectedDought(newDough);
  const handleSizeSelect = (newSize) => setSelectedSize(newSize);

  const handleAdd = () => {
    addPizza({
      id: pizza.id,
      name,
      dough: selectedDough,
      size: selectedSize,
      price,
      image,
    });
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        gridRowStart: row,
        gridRowEnd: row,
        gridColumnStart: column,
        gridColumnEnd: column,
        justifySelf: "center",
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={imageHelper(image)}
        alt="pizza"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Box className="card-toggle-box">
          <PizzaItemToggle
            values={dough}
            selectedValue={selectedDough}
            setSelectedValue={handleDoughSelect}
          />
          <PizzaItemToggle
            values={sizes}
            selectedValue={selectedSize}
            setSelectedValue={handleSizeSelect}
          />
        </Box>
      </CardContent>
      <CardActions className="card-actions">
        <Typography>from {price} rubles</Typography>
        <button className="card-button" onClick={handleAdd}>
          <div>Add</div>
          {amount ? <div className="card-actions__amount">{amount}</div> : null}
        </button>
      </CardActions>
    </Card>
  );
};

export default PizzaItem;
