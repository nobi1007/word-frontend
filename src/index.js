import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "./initialize";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import configureStore from "./configureStore";

import App from "./App";

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URL,
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
