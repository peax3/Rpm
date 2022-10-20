import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import BulkProduct from "./BulkProduct"
import BulkHome from "./BulkHome";


const Bulk = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    path: "bul",
    bulk:null
  });

  const setRoute=(r)=>{
    setData(()=>({
      ...data,
      path:r
    }));
  }

  const setBulk=(r,p)=>{
    console.log(r,p)
    setData(()=>({
      ...data,
      bulk:r,
      path:p
    }));
  }
  const { path, bulk } = data;

  const routes = {
    bul: <BulkHome setBulk={setBulk}/>,
    hom: <BulkProduct setRoute={setRoute} bulk={bulk}/>,
  };

  return <>{routes[path]}</>;
};

export default Bulk;
