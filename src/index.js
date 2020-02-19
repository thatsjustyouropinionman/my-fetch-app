import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import gql from "graphql-tag";

import App from "./App";

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://fakerql.nplan.io/" }),
  cache: new InMemoryCache()
});

// const query = gql
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
