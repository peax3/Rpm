import React, { Component } from "react";
import Neon from "./Neon";
import { Provider } from "react-redux";
import store  from "./state/store";
import ReactDOM from "react-dom";

ReactDOM.render(
  <Provider store={store}>
    <Neon />
  </Provider>,
  document.getElementById("start")
);
