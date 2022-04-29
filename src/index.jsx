import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';

import { StoreProvider } from "Context/storeContext";
import client from "Lib/apolloClient";
import App from "./App";

import "Styles/index.scss";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter >
      <StoreProvider>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </StoreProvider>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
