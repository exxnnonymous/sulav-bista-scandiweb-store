import { ApolloClient, InMemoryCache } from "@apollo/client";

const config = {
  typePolicies: {
    AttributeSet: {
      keyFields: false,
    },
    Attribute: {
      keyFields: false,
    },
  },
};

const uri = "http://localhost:4000/";

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(config),
});
export default client;
