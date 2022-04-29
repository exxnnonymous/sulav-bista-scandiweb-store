import { gql } from "@apollo/client";

export const storeQuery = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          amount
          currency {
            label
            symbol
          }
        }

        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
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
