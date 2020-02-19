import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";
import { request } from "graphql-request";

import App from "./App";

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://fakerql.nplan.io/graphql" }),
  cache: new InMemoryCache()
});

const myQuery = `
  {
    allProducts(count: 10) {
      id
      name
      price
    }
  }
`;

request("https://fakerql.nplan.io/graphql", myQuery).then(data =>
  console.log(data)
);

const ALL_PRODUCTS = gql`
  {
    allProducts(count: 5) {
      id
      name
      price
    }
  }
`;

const ALL_POSTS = gql`
  {
    allPosts(count: 50) {
      id
      title
      body
      published
      createdAt
    }
  }
`;

function AllProducts() {
  const { loading, error, data } = useQuery(ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allProducts.map(({ id, name, price }) => (
    <div key={id}>
      <p>
        {id}: {name} = {price}
      </p>
    </div>
  ));
}
function AllPosts() {
  const { loading, error, data } = useQuery(ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allPosts.map(({ id, title, body, createdAt }) => (
    <div key={id}>
      <p>ID:{id}</p>
      <p>
        TITLE: {title} <br /> {body}
      </p>
      <p>Created at: {createdAt}</p>
    </div>
  ));
}
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    <AllProducts />,
    <AllPosts />,
  </ApolloProvider>,
  document.getElementById("root")
);
// ReactDOM.render(<AllProducts />, document.getElementById("root"));
