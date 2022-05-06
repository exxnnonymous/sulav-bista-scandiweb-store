import client from "Apollo/apolloClient";
import { productQuery } from "Apollo/queries";
import { useNavigate, useParams } from "react-router-dom";

// to filter active currency
export const filterPrice = (prices, currency) => {
  return prices.filter((price) => price.currency.label === currency.label)[0];
};

//  to use react router dom hooks
export function withRouter(Child) {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    return <Child {...props} params={params} navigate={navigate} />;
  };
}

// to change order of attribute ( keep swatch attribute at end of list)
export const sortAttributes = (arr) => {
  const index = arr.indexOf(arr.find((a) => a.id === "Color"));
  if (index === -1) return arr;
  const last = arr.length - 1;
  const newArr = [...arr];
  if (index !== last) {
    const temp = newArr[index];
    newArr[index] = newArr[last];
    newArr[last] = temp;
  }
  return newArr;
};

// to get total price of product in particular currency
export const totalPrice = (products, currency) => {
  const totalPrice = products.reduce((total, item) => {
    const price = item.prices.find((i) => i.currency.label === currency.label);
    return total + price.amount * item.quantity;
  }, 0);
  return totalPrice;
};

// fetch products in the cart
export async function updateCart() {
  const { cartUpdated, cart } = this.context;
  try {
    const products = [];
    for (const item of cart.items) {
      const { data } = await client.query({
        query: productQuery,
        variables: {
          id: item.id,
        },
      });
      products.push({
        ...data.product,
        selectedAttribute: item.attribute,
        quantity: item.quantity,
      });
    }
    this.setState({ products });
    cartUpdated();
  } catch (err) {
    this.setState({ error: true });
    cartUpdated();
  }

}
