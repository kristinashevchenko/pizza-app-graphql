import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "../styles/pizza.css";

const PizzaItemToggle = ({
  values,
  translations,
  selectedValue,
  setSelectedValue,
}) => {
  const handleFilter = (event, newValue) => {
    setSelectedValue(newValue);
  };
  return (
    <ToggleButtonGroup
      value={selectedValue}
      onChange={handleFilter}
      exclusive
      className="card-toggle-button-group"
    >
      {values.map((value) => {
        return (
          <ToggleButton
            value={value}
            key={value}
            className="card-toggle-button"
          >
            {translations ? translations[value] : value}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default PizzaItemToggle;
