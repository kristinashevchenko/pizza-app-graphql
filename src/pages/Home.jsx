import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@apollo/client";
import Filter from "../components/Filter.jsx";
import PizzaItem from "../components/PizzaItem.jsx";
import "../styles/pizza.css";
import { ALL, SORTS } from "../contants";
import { sortHelper } from "../helpers/sortHelpers";
import { addPizza } from "../helpers/cartManager.js";
import { GET_PIZZAS } from "../graphql/getPizzas.js";
import { UPDATE_AMOUNT } from "../graphql/updateAmount.js";

const defaultPizza = [];
const gridNumber = 4;

const Home = () => {
  const { data = {}, loading } = useQuery(GET_PIZZAS);
  const [updateAmount] = useMutation(UPDATE_AMOUNT);
  const [allPizzas, setAllPizzas] = useState(defaultPizza);
  const [filteredPizza, setFilteredPizza] = useState(defaultPizza);
  const [filters, setFilters] = useState(() => [ALL]);
  const [sort, setSort] = useState(SORTS[0]);
  const [order, setOrder] = useState(-1);

  useEffect(() => {
    // set pizza
    const { pizzas = [] } = data;
    if (pizzas.length) {
      setFilteredPizza(pizzas);
      setAllPizzas(pizzas);
    }
  }, [data]);

  if (loading) return null;

  const handleFilters = (newFilters) => {
    if (newFilters.includes(ALL)) setFilteredPizza(allPizzas);
    else {
      const newFilteredPizza = allPizzas.filter((pizza) =>
        pizza.kind?.some((type) => newFilters.includes(type))
      );

      setFilteredPizza(newFilteredPizza);
    }

    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    const comparator = sortHelper[newSort](order);
    const sortedPizzas = filteredPizza.slice().sort(comparator);
    setFilteredPizza(sortedPizzas);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    const comparator = sortHelper[sort](newOrder);
    const sortedPizzas = filteredPizza.slice().sort(comparator);
    setFilteredPizza(sortedPizzas);
  };

  const handleAddPizza = (pizza) => {
    addPizza(pizza);
    updateAmount({
      variables: {
        amount: -1,
      },
    });
  };

  return (
    <Box className="home">
      <Filter
        setFilters={handleFilters}
        filters={filters}
        sort={sort}
        setSort={handleSortChange}
        order={order}
        setOrder={handleOrderChange}
      />
      <Box className="pizzas-box">
        <Box className="pizzas-grid">
          {filteredPizza.map((pizza, index) => (
            <PizzaItem
              pizza={pizza}
              key={pizza.id}
              column={(index % gridNumber) + 1}
              row={Math.floor(index / gridNumber) + 1}
              addPizza={handleAddPizza}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
