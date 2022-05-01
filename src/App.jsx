import React from "react";
import Header from "Layout/Header";
import { storeQuery } from "Lib/storeQuery";
import "Styles/App.scss";
import StoreContext from "Context/storeContext";
import client from "Lib/apolloClient";
import Category from "Pages/Category";
import { Route, Routes } from "react-router-dom";
import Product from "Pages/Product";
import CartPage from "Pages/Cart";
import Intro from "Components/Intro";

class App extends React.Component {
  static contextType = StoreContext;
  state = {
    loading: true,
    loadingFinal: false,
    error: false
  };

  // grabbing initial data
  getData = async () => {
    this.setState({ loading: true });
    const { updateState } = this.context;

    try {
      const { data } = await client.query({ query: storeQuery });
      const cart = JSON.parse(localStorage.getItem('cart'))
      const activeCurrency = JSON.parse(localStorage.getItem('active-currency'))
      updateState(data, cart, activeCurrency);
      setTimeout(() => {
        this.setState({ loadingFinal: true }, () => {
          setTimeout(() => {
            this.setState({ loading: false })
          }, 800)
        });
      }, 1000)

    } catch (err) {
      this.setState({ loading: false, error: true });

    }



  };



  componentDidMount() {
    this.getData();
  }

  mainComponent(loading, loadingFinal, error) {
    if (loading) {
      return <Intro endLoading={loadingFinal} />;
    }
    if (error) {
      return <div>Some error occured!</div>;
    }

    else {
      return (
        <>
          <Header />
          <Routes>
            <Route path="/" exact element={<Category />} />
            <Route path="/cart" exact element={<CartPage />} />
            <Route path="products/:id" exact element={<Product />} />
          </Routes>
        </>
      );
    }
  }

  render() {
    const { loading, loadingFinal, error } = this.state;
    return <div id="app">{this.mainComponent(loading, loadingFinal, error)}</div>;
  }
}

export default App;
