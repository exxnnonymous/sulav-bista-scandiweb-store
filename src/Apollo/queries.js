import { gql } from "@apollo/client";

export const storeQuery = gql`
  query {
    categories {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        category
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

export const categoryQuery = gql`
  query CATEGORIES($title: String!) {
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
            displayValue
            value
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
      category
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
          displayValue
          value
          id
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
