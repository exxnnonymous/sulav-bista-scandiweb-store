import React from "react";
import Header from "Layout/Header";
import { storeQuery } from "Lib/storeQuery";
import "Styles/App.scss";
import StoreContext from "Context/storeContext";
import client from "Lib/apolloClient";

class App extends React.Component {
  static contextType = StoreContext;
  state = {
    loading: true,
  };

  // grabbing initial data
  getData = async () => {
    this.setState({ loading: true });
    const { updateState } = this.context;

    const res = await client.query({ query: storeQuery });
    updateState(res.data.categories);
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.getData();
  }


  mainComponent(loading) {
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <Header />
        </>
      );
    }
  }

  render() {
    const { loading } = this.state;
    return <div id="app">{this.mainComponent(loading)}</div>;
  }
}

export default App;
