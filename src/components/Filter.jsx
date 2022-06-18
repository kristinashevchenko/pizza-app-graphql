import React from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FILTERS, FILTER_NAMES, SORTS, SORT_NAMES } from "../contants";
import "../styles/pizza.css";

const SORT_STYLES = {
  "&.MuiFormControl-root": {
    flexDirection: "row",
    alignItems: "center",
  },
};

const Filter = ({ setFilters, filters, sort, setSort, order, setOrder }) => {
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleFilter = (event, newFormats) => {
    setFilters(newFormats);
  };

  const handleOrder = () => setOrder(order * -1);

  return (
    <Box className="filter">
      <ToggleButtonGroup value={filters} onChange={handleFilter}>
        {FILTERS.map((filter) => {
          return (
            <ToggleButton
              value={filter}
              key={filter}
              className="filter-button"
              sx={{
                "&.MuiToggleButtonGroup-grouped:not(:last-of-type),&.MuiToggleButtonGroup-grouped:not(:first-of-type)":
                  {
                    borderRadius: 10,
                    border: 0,
                  },
                "&.Mui-selected,&.Mui-selected:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              {FILTER_NAMES[filter]}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth error sx={SORT_STYLES}>
          <IconButton onClick={handleOrder}>
            <SortIcon
              style={{
                transform: order === 1 ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </IconButton>

          <p id="demo-simple-select-label" className="sort-label">
            Сортировка по
          </p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Сортировка по"
            variant="standard"
            onChange={handleChange}
          >
            {SORTS.map((sort) => (
              <MenuItem value={sort} key={sort}>
                {SORT_NAMES[sort]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Filter;
