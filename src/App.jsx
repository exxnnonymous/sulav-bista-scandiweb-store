import React from "react";
import { Route, Routes } from "react-router-dom";
import StoreContext from "Context/storeContext";
import { categoriesQuery, storeQuery } from "Apollo/queries";
import client from "Apollo/apolloClient";
import Category from "Pages/Category";
import Product from "Pages/Product";
import CartPage from "Pages/Cart";
import Intro from "Components/Intro";
import ServerError from "Components/ServerError";
import Checkout from "Pages/Checkout";
import "Styles/app.scss";
import Home from "Pages/Home";

class App extends React.Component {
  static contextType = StoreContext;

  // initial state
  state = {
    loading: true,
    loadingFinal: false,
    error: false
  };

  // grabbing initial data
  getData = async () => {
    this.setState({ loading: true });
    const { updateCategories } = this.context;

    try {
      const { data } = await client.query({ query: categoriesQuery });
      // const cart = JSON.parse(localStorage.getItem('cart'))
      // const activeCurrency = JSON.parse(localStorage.getItem('active-currency'))
      updateCategories(data);
      this.setState({ loading: false })

      // starting final loading animation
      // setTimeout(() => {
      //   this.setState({ loadingFinal: true }, () => {
      //     // closing loading screen
      //     setTimeout(() => {
      //       this.setState({ loading: false })
      //     }, 800)
      //   });
      // }, 1000)

    } catch (err) {
      this.setState({ loading: false, error: true });

    }



  };



  componentDidMount() {
    this.getData();
  }

  mainComponent(loading, loadingFinal, error) {
    if (loading) {
      // display loading screen
      return <Intro endLoading={loadingFinal} />;
    }
    if (error) {
      // display error screen
      return <ServerError />;
    }

    else {
      // main screen
      return (
        <>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="category/:category" exact element={<Category />} />
            <Route path="/cart" exact element={<CartPage />} />
            <Route path="products/:id" exact element={<Product />} />
            <Route path="checkout" exact element={<Checkout />} />
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
