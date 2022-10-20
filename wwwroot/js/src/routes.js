import React, { Component } from "react";
import {Account, UpdateAccount, Settings} from "../components/accountPage/index";
import Home from '../components/homePage/Home'
import {Add, View} from '../components/productPage/index'
import {Mybalance} from '../components/profilePage/index'
import Profile from "../components/usersPage/Profile"
import Board from "../components/categoryListingPage/Board";

const routes = {

    '/': () => <Home />,
    '/men': () => <Board />,
    '/women': () => <Board />,
    '/kids': () => <Board />,
    '/account/': () => <Account />,
    '/account/settings/': () => <Settings />,
    '/account/update-profile': () => <UpdateAccount />,
    '/product/add': () => <Add />,
    '/product/:id': ({id}) => <View id={id}/>,
    '/users/:username': ({username}) => <Profile username={username}/>,
    '/account/my-balance/': () => <Mybalance />,

  };

  export default routes;