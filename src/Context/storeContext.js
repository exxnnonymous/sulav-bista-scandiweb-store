import React from "react";

const storeDefaultState = {};

const StoreContext = React.createContext(storeDefaultState);
export const StoreConsumer = StoreContext.Consumer;

export class StoreProvider extends React.Component {
  state = {
    categories: null,
    currency: null,
  };

  changeCurrency = (label)=>{
    const {currency} = this.state
    const active = (currency.list.filter(cur=>cur.label===label))[0]
    this.setState({currency: {...currency,active}})
  }

  updateState = ({ currencies, categories }) => {
    const active = {
      symbol: currencies[0].symbol,
      label: currencies[0].label,
    };
    this.setState({
      categories,
      currency: {
        list: currencies,
        active,
      },
    });
  };

  render() {
    const { categories, currency } = this.state;
    const store = {
      currency,
      categories,

      updateState: this.updateState,
      changeCurrency:this.changeCurrency
    };
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default StoreContext;
