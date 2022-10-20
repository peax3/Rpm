import React, { Component } from "react";
import {useRoutes, A} from 'hookrouter';
import routes from './routes'


const Home = () => {
    const match = useRoutes(routes);

    return (
      <>
        {match || <p>NOT FOUNDs</p>}
      </>
    )
}


export default Home;
