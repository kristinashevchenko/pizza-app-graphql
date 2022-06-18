import { gql } from "@apollo/client";

export const GET_PIZZAS = gql`
  query getPizzas {
    pizzas {
      id
      name
      image
      popularity
      kind
      modifications {
        id
        size
        dough
        price
      }
    }
  }
`;
