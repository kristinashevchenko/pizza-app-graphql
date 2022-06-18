import { gql } from "@apollo/client";
import { ORDER_FRAGMENT } from "./orderFragment";

export const GET_ORDERS = gql`
  ${ORDER_FRAGMENT}
  query getOrders {
    orders {
      ...orderFragment
    }
  }
`;
