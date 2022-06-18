import React from "react";
import { Route, Switch } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";
import Cart from "./pages/Cart.jsx";
import "./App.css";
import { cartVar } from "./graphql/init";

function App() {
  const cart = useReactiveVar(cartVar);
  const { items, price } = cart;

  return (
    <div className="App">
      <div className="inner-app">
        <Header orderNumber={items.length} price={price} />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/orders" component={Orders} exact />
        </Switch>
      </div>
    </div>
  );
}

export default App;
