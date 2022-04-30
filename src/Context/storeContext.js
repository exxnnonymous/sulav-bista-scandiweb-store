import React from "react";

const storeDefaultState = {};

const StoreContext = React.createContext(storeDefaultState);
export const StoreConsumer = StoreContext.Consumer;

export class StoreProvider extends React.Component {
  state = {
    category: {
      type: null,
      active: null,
    },
    currency: null,
    activeProducts: null,
    cart: {
      items: [],
      totalItems: 0,
    },
  };

  productsInCart = () => {
    const { cart, category } = this.state;
    const { items } = cart;
    const { products } = category.type.find((cat) => cat.name === "all");
    const productInCart = [];
    items.forEach((item) => {
      productInCart.push(products.find((pro) => pro.id === item.id));
    });

    return productInCart;
  };

  updateState = ({ currencies, categories }, cart) => {
    const activeCurrency = currencies[0];

    const activeCategory = categories[0];
    if (!cart) {
      cart = {
        items: [],
        totalItems: 0,
      };
    }

    this.setState({
      category: {
        type: categories,
        active: activeCategory,
      },
      currency: {
        type: currencies,
        active: activeCurrency,
      },
      cart,
    });
  };

  getProductsByCategory = (category) => {
    const res = this.state.category.type.filter(
      (cat) => cat.name === category
    )[0];
    return res.products;
  };

  getProduct = (id) => {
    const { products } = this.state.category.type.filter(
      (cat) => cat.name === "all"
    )[0];
    return products.filter((pro) => pro.id === id)[0];
  };

  changeCurrency = (label) => {
    const { currency } = this.state;
    if (currency.active.label === label) return;
    const active = currency.type.filter((cur) => cur.label === label)[0];
    this.setState({ currency: { ...currency, active } });
  };

  changeCategory = (name) => {
    const { category } = this.state;
    if (category.active.name === name) return;
    const active = category.type.filter((cat) => cat.name === name)[0];
    this.setState({ category: { ...category, active } });
  };

  // cart functionality

  updateLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  addToCart = (id, attribute) => {
    const { cart } = this.state;
    if (!attribute) {
      this.setState(
        {
          cart: {
            items: [...cart.items, { id }],
            totalItems: cart.totalItems + 1,
          },
        },
        this.updateLocalStorage
      );
    }
  };

  removeFromCart = (id) => {
    const { cart } = this.state;
    const items = [...cart.items];
    const index = items.findIndex((i) => i.id === id);
    if (index > -1) {
      items.splice(index, 1);
      this.setState(
        { cart: { items, totalItems: cart.totalItems - 1 } },
        this.updateLocalStorage
      );
    }
  };

  render() {
    const { category, currency, cart } = this.state;
    const store = {
      currency,
      category,
      cart,

      getProductsByCategory: this.getProductsByCategory,
      getProduct: this.getProduct,
      updateState: this.updateState,
      changeCurrency: this.changeCurrency,
      changeCategory: this.changeCategory,

      productsInCart: this.productsInCart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
    };
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default StoreContext;
