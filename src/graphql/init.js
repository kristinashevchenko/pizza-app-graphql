import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import {
  ApolloClient,
  InMemoryCache,
  makeVar,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { SERVER_URL, WS_URL } from "../contants";

const cartVar = makeVar({ items: [], price: 0 });

const cache = new InMemoryCache({
  typePolicies: {
    Pizza: {
      keyFields: ["id", "name"],
    },
    Query: {
      fields: {
        cartVar: {
          read() {
            return cartVar();
          },
        },
      },
    },
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${WS_URL}/graphql`,
  })
);

const httpLink = new HttpLink({
  uri: `${SERVER_URL}/graphql`,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export { client, cartVar };
