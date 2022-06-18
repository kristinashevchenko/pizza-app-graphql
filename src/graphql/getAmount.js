import { gql } from "@apollo/client";

export const GET_AMOUNT = gql`
  query getAmount {
    amount
  }
`;
