import React, { Component } from "react"
import Home from "./homePage/Home"
import {Members, Roles} from "./memberPage/Index"
import {Categories} from "./categoryPage/Index"
import {Dispatcher} from "./dispatchPage/Index"

const routes = {
  "/neon": () => <Home />,
  "/neon/members": () => <Members />,
  "/neon/dispatch": () => <Dispatcher />,
  "/neon/member-roles": () => <Roles />,
  "/neon/categories": () => <Categories />,
};

export default routes;
