import { gql } from "@apollo/client";
import { ORDER_FRAGMENT } from "./orderFragment";

export const CREATE_ORDER = gql`
  ${ORDER_FRAGMENT}
  mutation createOrder(
    $totalPrice: Float!
    $totalAmount: Int!
    $orderedPizzas: [PizzaOrderInput]
  ) {
    createOrder(
      order: {
        totalPrice: $totalPrice
        totalAmount: $totalAmount
        orderedPizzas: $orderedPizzas
      }
    ) {
      ...orderFragment
      orderedPizzas {
        pizzaName
        price
        size
        dough
      }
    }
  }
`;
