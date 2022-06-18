import { gql } from "@apollo/client";

export const AMOUNT_SUBSCRIBTION = gql`
  subscription Subscribtion {
    amountUpdated
  }
`;
