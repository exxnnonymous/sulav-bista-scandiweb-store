import React from "react";

const storeDefaultState = {};

const StoreContext = React.createContext(storeDefaultState);
export const StoreConsumer = StoreContext.Consumer;

export class StoreProvider extends React.Component {
  // initial state
  state = {
    categories: [],
    currency: null,
    cart: {
      items: [],
      totalItems: 0,
      needsUpdate: false,
    },
  };

  // to update store when app is initialized
  updateCart = (cart) => {
    if (cart) {
      this.setState({ cart: { ...cart, needsUpdate: false } });
    }
  };

  updateCategories = ({ categories, currencies }, activeCurrency) => {
    let active = currencies[0];

    if (activeCurrency) {
      active = activeCurrency;
    }
    this.setState({
      categories,
      currency: { type: currencies, active: active },
    });
  };

  // to chagne the active currency
  changeCurrency = (label) => {
    const { currency } = this.state;
    if (currency.active.label === label) return;
    const active = currency.type.filter((cur) => cur.label === label)[0];
    this.setState({ currency: { ...currency, active } }, () => {
      localStorage.setItem("active-currency", JSON.stringify(active));
    });
  };

  /////////////////////////////////////////////////////////////////////////////////////////
  // -------------------------------- cart functionality ------------------------------- //
  /////////////////////////////////////////////////////////////////////////////////////////

  // updating localstorage after adding items to cart
  updateLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  // find index of product in cart
  findIndex = (id, attribute) => {
    const { cart } = this.state;

    let matched = -1;

    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      if (item.id === id) {
        for (const [key, value] of Object.entries(attribute)) {
          if (item.attribute[key] !== value) {
            matched = -1;
            break;
          } else {
            matched = i;
          }
        }
      }
      if (matched !== -1) {
        break;
      }
      matched = -1;
    }

    return matched;
  };

  // increase/ decrease quantity of item from cart
  alterQuantity = (index, increaseBy) => {
    const { cart } = this.state;
    const updatedItems = cart.items.map((item, idx) => {
      if (idx === index)
        return { ...item, quantity: item.quantity + increaseBy };

      return item;
    });

    this.setState(
      {
        cart: {
          items: updatedItems,
          totalItems: cart.totalItems + increaseBy,
          needsUpdate: true,
        },
      },
      this.updateLocalStorage
    );
  };

  // to add item to cart
  addToCart = (id, attribute) => {
    const { cart } = this.state;

    let index;
    if (Object.keys(attribute).length === 0) {
      index = cart.items.findIndex((item) => item.id === id);
    } else {
      index = this.findIndex(id, attribute);
    }

    // increasing the quantity if item is already in the cart
    if (index !== -1) {
      this.alterQuantity(index, 1);
    } else {
      // adding new item to cart
      this.setState(
        {
          cart: {
            items: [...cart.items, { id, attribute, quantity: 1 }],
            totalItems: cart.totalItems + 1,
            needsUpdate: true,
          },
        },
        this.updateLocalStorage
      );
    }
  };

  // to remote item from cart
  removeFromCart = (id, attribute) => {
    const { cart } = this.state;

    let index;
    if (Object.keys(attribute).length === 0) {
      index = cart.items.findIndex((item) => item.id === id);
    } else {
      index = this.findIndex(id, attribute);
    }

    if (index > -1) {
      const items = [...cart.items];

      const quantity = items[index].quantity;
      if (quantity === 1) {
        items.splice(index, 1);
        this.setState(
          {
            cart: { items, totalItems: cart.totalItems - 1, needsUpdate: true },
          },
          this.updateLocalStorage
        );
      } else {
        this.alterQuantity(index, -1);
      }
    }
  };

  cartUpdated = () => {
    this.setState({ cart: { ...this.state.cart, needsUpdate: false } });
  };

  emptyCart = () => {
    this.setState({
      cart: {
        items: [],
        totalItems: 0,
        needsUpdate: true,
      },
    }, ()=>{
      localStorage.removeItem('cart')
    });
  };

  render() {
    const { categories, currency, cart } = this.state;

    // sharing store properties and methods
    const store = {
      currency,
      categories,
      cart,

      updateCart: this.updateCart,
      updateCategories: this.updateCategories,

      changeCurrency: this.changeCurrency,

      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      cartUpdated: this.cartUpdated,
      emptyCart: this.emptyCart,
    };
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default StoreContext;
