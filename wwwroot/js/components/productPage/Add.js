import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AddProduct from "./AddProduct"
import Bulk from "./Bulk";



const Add = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    path: "hom",
  });

  const setRoute=(r)=>{
    setData(()=>({
      ...data,
      path:r
    }));
  }
  const { path } = data;

  const routes = {
    bul: <Bulk />,
    hom: <AddProduct setRoute={setRoute}/>,
  };

  return <>{routes[path]}</>;
};

export default Add;
