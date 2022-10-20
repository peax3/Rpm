import React, { Component } from "react";
import {useRoutes, A} from 'hookrouter';
import routes from './routes'


const Neon = () => {
    const match = useRoutes(routes);

    return (
      <>
        {match || <p>NOT FOUNDs</p>}
      </>
    )
}


export default Neon;
