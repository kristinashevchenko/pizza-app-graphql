import { gql } from "@apollo/client";

export const UPDATE_AMOUNT = gql`
  mutation updatePizzaAmount($amount: Int!) {
    updateAmount(amount: $amount)
  }
`;
