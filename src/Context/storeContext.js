import React from "react";

const storeDefaultState = {};

const StoreContext = React.createContext(storeDefaultState);
export const StoreConsumer = StoreContext.Consumer;

export class StoreProvider extends React.Component {
  state = {
    category: null,
    currency: null,
    activeProducts: null,
  };

 

  updateState = ({ currencies, categories }) => {
    const activeCurrency = currencies[0];

    const activeCategory = categories[0];

    this.setState({
      category: {
        type: categories,
        active: activeCategory,
      },
      currency: {
        type: currencies,
        active: activeCurrency,
      },
    });
  };

  getProductsByCategory = (category) => {
    const res = this.state.category.type.filter(
      (cat) => cat.name === category
    )[0];
    return res.products;
  };

  getProduct = (id)=>{
    const {products} = this.state.category.type.filter(cat=>cat.name === "all")[0]
    return (products.filter(pro => pro.id === id))[0]
  }


  changeCurrency = (label) => {
    const { currency } = this.state;
    if(currency.active.label === label) return 
    const active = currency.type.filter((cur) => cur.label === label)[0];
    this.setState({ currency: { ...currency, active } });
  };

  changeCategory = (name) => {
    const { category } = this.state;
    if(category.active.name === name) return 
    const active = category.type.filter((cat) => cat.name === name)[0];
    this.setState({ category: { ...category, active } });
  };

  render() {
    const { category, currency } = this.state;
    const store = {
      currency,
      category,

      getProductsByCategory: this.getProductsByCategory,
      getProduct:this.getProduct,
      updateState: this.updateState,
      changeCurrency: this.changeCurrency,
      changeCategory: this.changeCategory,
    };
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default StoreContext;
