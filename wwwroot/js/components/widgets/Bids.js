import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Features = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const { productId } = props;

  const [data, setData] = useState({
    bids: [],
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  });

  const { bids, pageNumber, pageSize, total } = data;

  const fetchOrders = () => {
    const url = "/product/GetProductOrder";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { pageNumber: 1, pageSize: 10, productId: productId },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      success: function(response) {
        const { pageNumber, pageSize, totalNumberOfItems, results } = response;
        setData((data) => ({
          ...data,
          pageNumber: pageNumber,
          pageSize: pageSize,
          total: totalNumberOfItems,
          bids: [...bids, ...results],
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="container _Uzep_">
        <div className="row">
          {bids.map((x, i) => {
            return (
              <div className="col-3 xFcoy_" key={x.oderId}>
                <div className="media">
                  <a className="pull-left" href="#" style={{marginRight:"10px"}}>
                    <img
                      className="media-object img-rounded"
                      src="/img/prof.jpg"
                      style={{maxHeight:"64px", maxWidth:"64px"}}
                    />
                  </a>
                  <div className="media-body">
                    <h4 className="media-heading">{x.userName}</h4>
                    <span className="media-heading mgr_">Swap: <a href="#">Product</a></span>
                    <span className="media-heading">Points: 200</span>
                    <p>{moment(x.created).format('llll')}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Features;
