import React, { Component } from "react";
import Home from "./Home";
import { Provider } from "react-redux";
import store  from "../state/store";
import ReactDOM from "react-dom";

const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
ReactDOM.render(
  <Provider store={store}>
    <Home xrf={xrf} />
  </Provider>,
  document.getElementById("start")
);
