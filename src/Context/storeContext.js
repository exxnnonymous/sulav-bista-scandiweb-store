import React from "react";

const storeDefaultState = {};

const StoreContext = React.createContext(storeDefaultState);
export const StoreConsumer = StoreContext.Consumer;

export class StoreProvider extends React.Component {
  // initial state
  state = {
    categories: [],
    cachedCategory: [],
    currency: null,
    cart: {
      items: [],
      totalItems: 0,
    },
  };

  // to update store when app is initialized
  updateCategories = ({ categories, currencies }) => {
    const activeCurrency = currencies[0];
    this.setState({
      categories,
      currency: { type: currencies, active: activeCurrency },
    });
  };

  cacheCategory = (category) => {
    this.state.cachedCategory.push(category);
  };

  getCategory = (name)=>{
    const category = this.state.cachedCategory.find(cat=>cat.name===name)
    return category
  }


  // to chagne the active currency
  changeCurrency = (label) => {
    const { currency } = this.state;
    if (currency.active.label === label) return;
    const active = currency.type.filter((cur) => cur.label === label)[0];
    this.setState({ currency: { ...currency, active } }, () => {
      localStorage.setItem("active-currency", JSON.stringify(active));
    });
  };

  // ********************** cart functionality **************

  // grab products available in the cart
  productsInCart2 = () => {
    const { cart, category } = this.state;
    const { items } = cart;
    const { products } = category.type.find((cat) => cat.name === "all");
    const productInCart = [];
    items.forEach((item) => {
      const product = products.filter((pro) => pro.id === item.id)[0];
      if (item.attribute.length > 0) {
        const found = [];
        for (let i = 0; i < productInCart.length; i++) {
          const pro = productInCart[i];

          if (pro.id === product.id) {
            let _found = true;
            pro.selected.forEach((p, idx) => {
              if (p !== item.attribute[idx]) {
                _found = false;
                return;
              }
            });
            if (_found) {
              found.push(pro);
            }
          }
        }

        if (found.length === 0) {
          let quantity = 0;
          items.forEach((val) => {
            if (val.id === item.id) {
              let _found = false;

              val.attribute.forEach((v, idx) => {
                if (v === item.attribute[idx]) {
                  _found = true;
                } else {
                  _found = false;
                }
              });

              if (_found) {
                quantity++;
              }
            }
          });

          productInCart.push({
            ...product,
            selected: item.attribute,
            quantity,
          });
        }
      } else {
        const found = productInCart.filter((i) => i.id === product.id);

        if (found.length === 0) {
          const quantity = items.filter((i) => i.id === product.id).length;

          productInCart.push({
            ...product,
            selected: item.attribute,
            quantity,
          });
        }
      }
    });
    return productInCart;
  };

  productsInCart = ()=>{

  }

  // updating localstorage after adding items to cart
  updateLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  // to add item to cart
  addToCart = (id, attribute) => {
    const { cart } = this.state;
    this.setState(
      {
        cart: {
          items: [...cart.items, { id, attribute }],
          totalItems: cart.totalItems + 1,
        },
      },
      this.updateLocalStorage
    );
  };

  // to remote item from cart
  removeFromCart = (id, attribute) => {
    const { cart } = this.state;
    const items = [...cart.items];
    let index = -1;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === id) {
        let _found = true;
        item.attribute.forEach((attr, idx) => {
          if (attr !== attribute[idx]) {
            _found = false;
            return;
          }
        });
        if (_found) {
          index = i;
          break;
        }
      }
    }

    if (index > -1) {
      items.splice(index, 1);
      this.setState(
        { cart: { items, totalItems: cart.totalItems - 1 } },
        this.updateLocalStorage
      );
    }
  };

  render() {
    const { categories, currency, cart } = this.state;
    // sharing store properties and methods
    const store = {
      currency,
      categories,
      cart,

      cacheCategory: this.cacheCategory,
      getCategory: this.getCategory,
      updateCategories: this.updateCategories,

      changeCurrency: this.changeCurrency,

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
