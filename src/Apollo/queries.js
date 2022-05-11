import { gql } from "@apollo/client";

export const categoryQuery = gql`
  query ($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        brand
        attributes {
          id
          name
          type
          items {
            id
          }
        }
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`;

export const productQuery = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      gallery
      description
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
          id
          value
        }
      }
    }
  }
`;

export const categoriesQuery = gql`
  query {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

