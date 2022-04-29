import { gql } from "@apollo/client";

export const storeQuery = gql`
  query {
    categories {
      name
      products{
        id
        name
        inStock
        gallery
        prices{
          amount
          currency{
            label
            symbol
          }
        }
      }
    }
    currencies {
      label
      symbol
    }
  }
`;
