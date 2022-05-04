import { ApolloClient, InMemoryCache } from "@apollo/client";

const localUrl = "http://localhost:4000";

const client = new ApolloClient({
  uri: localUrl,
  cache: new InMemoryCache(),
});

export default client;
