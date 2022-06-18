import { gql } from "@apollo/client";

export const ORDER_FRAGMENT = gql`
  fragment orderFragment on Order {
    id
    totalPrice
    totalAmount
  }
`;
