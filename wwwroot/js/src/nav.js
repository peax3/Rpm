import React, { Component } from "react";
import Nav from "../components/layout/Nav";
import { Provider } from "react-redux";
import store  from "../state/store";
import ReactDOM from "react-dom";

const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
ReactDOM.render(
  <Provider store={store}>
    <Nav xrf={xrf} />
  </Provider>,
  document.getElementById("ntheader")
);
