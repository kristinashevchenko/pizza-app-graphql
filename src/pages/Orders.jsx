import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/cart.css";
import { GET_ORDERS } from "../graphql/getOrders";
import CartOrder from "../components/CartOrder";

const Orders = () => {
  const { data = {}, loading } = useQuery(GET_ORDERS);
  if (loading) return null;
  return (
    <Box className="cart-container">
      {data?.orders?.length ? (
        <Box>
          <h4>Предыдущие заказы</h4>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Стоимость</TableCell>
                  <TableCell align="center">Количество пицц</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.orders.map((order) => (
                  <CartOrder order={order} key={order.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null}
      <Link to="/">
        <button className="cart-buttons__button--empty-back">
          Вернуться назад
        </button>
      </Link>
    </Box>
  );
};

export default Orders;
