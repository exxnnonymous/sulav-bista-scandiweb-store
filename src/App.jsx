import React from "react";
import Header from "Layout/Header";
import { storeQuery } from "Lib/storeQuery";
import "Styles/App.scss";
import StoreContext from "Context/storeContext";
import client from "Lib/apolloClient";
import Category from "Pages/Category";

class App extends React.Component {
  static contextType = StoreContext;
  state = {
    loading: true,
    error: false
  };

  // grabbing initial data
  getData = async () => {
    this.setState({ loading: true });
    const { updateState } = this.context;

    try {
      const { data } = await client.query({ query: storeQuery });
      updateState(data);
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false, error: true });

    }
  };

  componentDidMount() {
    this.getData();
  }

  mainComponent(loading, error) {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Some error occured!</div>;
    }

    else {
      return (
        <>
          <Header />
          <Category />
        </>
      );
    }
  }

  render() {
    const { loading, error } = this.state;
    return <div id="app">{this.mainComponent(loading, error)}</div>;
  }
}

export default App;
