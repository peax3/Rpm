import React, { Component, useState, useEffect, useRef } from "react";

const SoldProduct = (props) => {
  const { order, deleteOrder } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    product_image: order.product_image,
    product_name: order.product_name,
    created: order.created,
    exchangePoints: order.exchangePoints,
    actor_username: order.actor_username,
    accepted_on: order.accepted_on,
    dispatched_on: order.dispatched_on,
    isSwap: order.isSwap,
    closed: order.closed,
    id: order.id,
    orderStatus: order.orderStatus
  });

  const {
    product_image,
    product_name,
    created,
    exchangePoints,
    actor_username,
    dispatched_on,
    accepted_on,
    isSwap,
    closed,
    id,
    orderStatus
  } = data;

  const checkDate = (val) => {
    return val == "0001-01-01T00:00:00";
  };

  const returnImage = (pd) => {
    if (pd == null) {
      return "/img/prof.jpg";
    }

    var images = JSON.parse(pd);
    return "http://" + images[0].Url;
  };

  const checkAction = (p) => {
    if (checkDate(accepted_on)) {
      return (
        <>
          Product dispatched? :<span className="cvghte">Yes</span>
          <span className="cvghte">No</span>
        </>
      );
    }
  };

  const accept = () => {
    const url = "/product/AcceptOrder";
    $.ajax({
      type: "Post",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { orderId: id },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      success: function(response) {
        setData((data) => ({
          ...data,
          accepted_on: new Date().toDateString(),
          orderStatus:1
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const reject = () => {
    const url = "/product/RejectOrder";
    $.ajax({
      type: "Post",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { orderId: id },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      success: function(response) {
        deleteOrder(id);
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const viewProduct = () => {
    window
      .open(
        window.location.origin + "/product/" + order.exchangeProductId,
        "_blank"
      )
      .focus();
  };

  return (
    <div className="col-lg-12 col-md-12 col-12 cv_Ui8">
      <p>PRODUCT DETAILS</p>
      <hr style={{ marginTop: "0.5em", marginBottom: "1em" }}></hr>
      <div className="row">
        <div className="col-md-5" style={{ borderRight: "1px solid grey" }}>
          <div style={{ display: "inline-block" }}>
            <img
              src={returnImage(product_image)}
              style={{ marginRight: "10px", verticalAlign: "inherit" }}
            />
          </div>
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            <p>Product name: {product_name}</p>
            <p>Ordered on: {created}</p>
            <p>Price: {exchangePoints}</p>
            <p>Buyer: {actor_username}</p>
          </div>
        </div>
        <div className="col-md-3" style={{ borderRight: "1px solid grey" }}>
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            <p>Order status: {closed ? "closed" : "open"}</p>
            <p>
              Accepted on: {!checkDate(accepted_on) ? accepted_on : "pending"}
            </p>
            <p>
              Dispatched on:{" "}
              {!checkDate(dispatched_on) ? dispatched_on : "pending"}
            </p>
            {!checkDate(accepted_on) && !checkDate(dispatched_on) ? (
              <>
                {!checkDate(received_on) ? (
                  <p>Received on: {received_on}</p>
                ) : (
                  <>
                    Received product? :<span className="cvghte">Yes</span>
                    <span className="cvghte">No</span>
                  </>
                )}
              </>
            ) : (
              <p>Received on: pending</p>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            {orderStatus == 0 ? (
              <>
                <button className="btn btn-success" onClick={() => accept(id)}>
                  Accept
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-danger" onClick={() => reject(id)}>
                  Reject
                </button>
              </>
            ) : (
              <button className="btn btn-danger" onClick={() => accept(id)}>
                Cancel order
              </button>
            )}
            <br />
            <br />
            {isSwap && (
              <button className="btn btn-success" onClick={viewProduct}>
                View swap
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldProduct;
