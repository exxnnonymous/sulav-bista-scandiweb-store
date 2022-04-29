import React from "react";

const storeDefaultState = {};

const StoreContext = React.createContext(storeDefaultState);
export const StoreConsumer = StoreContext.Consumer;

export class StoreProvider extends React.Component {
  state = {
    categories: null,
  };

  updateState = (data) =>{
    this.setState({categories: data})
  }

  render() {
    const { categories } = this.state;
    return (
      <StoreContext.Provider value={{ categories, updateState: this.updateState }}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}


export default StoreContext