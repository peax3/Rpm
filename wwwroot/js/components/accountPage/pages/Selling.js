import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommas } from "../../../utils/Helpers";
import {SoldProduct} from "./Index"
const Selling = (props) => {
  const dispatch = useDispatch();
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    pageNumber: 0,
    pageSize: 10,
    count: 0,
    feeds: [],
  });

  const { pageNumber, pageSize, count, feeds } = data;

  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = (e) => {
    const url = "/product/selling";
    $.ajax({
      type: "Get",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { pageNumber: pageNumber + 1, pageSize: pageSize, count: count },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        const {
          totalNumberOfPages,
          totalNumberOfItems,
          pageNumber,
          pageSize,
          results,
        } = response;
        setData((data) => ({
          ...data,
          feeds: [...feeds, ...results],
          page: pageNumber,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };


  const deleteOrder = (uid)=>{
      var fedas = [...feeds];
      fedas = fedas.filter((e)=> e.id !=  uid);
      setData((data) => ({
        ...data,
        feeds: fedas,
      }));
  }
  

  return (
    <>
      <div className="row">
        {feeds.map((p, i) => {
          return (
            <SoldProduct order={p} deleteOrder={deleteOrder}/>
          );
        })}
      </div>
    </>
  );
};

export default Selling;
