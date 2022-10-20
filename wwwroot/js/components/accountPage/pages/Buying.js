import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommas } from "../../../utils/Helpers";
const Buying = (props) => {
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
    const url = "/product/buying";
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

  const returnImage = (pd) => {
    if (pd == null) {
      return "/img/prof.jpg";
    }

    var images = JSON.parse(pd);
    return "http://" + images[0].Url;
  };

  const checkDate = (val) => {
    return val == "0001-01-01T00:00:00";
  };

  const checkAction = (p)=>{
    if(!p.closed && checkDate(p.received_on)){
      return <button className="btn btn-danger">Cancel</button>
    }
    return <button className="btn btn-danger">Reject</button>
  }

  return (
    <>
      <div className="row">
        {feeds.map((p, i) => {
          return (
            <div className="col-lg-12 col-md-12 col-12 cv_Ui8">
              <p>PRODUCT DETAILS</p>
              <hr style={{ marginTop: "0.5em", marginBottom: "1em" }}></hr>
              <div className="row">
                <div className="col-md-5" style={{borderRight:"1px solid grey"}}>
                  <div style={{ display: "inline-block" }}>
                    <img
                      src={returnImage(p.product_image)}
                      style={{ marginRight: "10px", verticalAlign: "inherit" }}
                    />
                  </div>
                  <div
                    style={{ display: "inline-block", verticalAlign: "top" }}
                  >
                    <p>Product name: {p.product_name}</p>
                    <p>Ordered on: {p.created}</p>
                    <p>Price: {p.exchangePoints}</p>
                    <p>Uploader: {p.target_username}</p>
                  </div>
                </div>
                <div className="col-md-3" style={{borderRight:"1px solid grey"}}>
                  <div
                    style={{ display: "inline-block", verticalAlign: "top" }}
                  >
                    <p>Order status: {p.closed ? "closed" : "open"}</p>
                    <p>Accepted on: {!checkDate(p.accepted_on) ? p.accepted_on :"pending"}</p>
                    <p>Dispatched on: {!checkDate(p.dispatched_on) ? p.dispatched_on: "pending"}</p>
                    {!checkDate(p.accepted_on) && !checkDate(p.dispatched_on) ? 
                      <>
                        {!checkDate(p.received_on) ? (
                          <p>Received on: {p.received_on}</p>
                        ) : (
                          <>
                            Received product? :
                            <span className="cvghte">Yes</span>
                            <span className="cvghte">No</span>
                          </>
                        )}
                      </>:<p>Received on: pending</p>
                    }
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    style={{ display: "inline-block", verticalAlign: "top" }}
                  >
                   {checkAction(p)}<br/><br/>
                   {p.isSwap && <button className="btn btn-success">Update swap</button>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Buying;
