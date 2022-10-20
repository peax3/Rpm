import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";

const MyBalance = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  const [data, setData] = useState({
    path: "home",
    bids: [],
    pag: { page: 1, size: 10, total: 0 },
  });

  useEffect(() => {
    getActiveBids();
  }, []);

  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const { bids, pag } = data;

  const getActiveBids = (e) => {
    const url = "/profile/GetActiveBids";
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      data: pag,
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        const { pageNumber, pageSize, totalNumberOfItems, results } = response;
        console.log(response);
        setData((data) => ({
          ...data,
          bids: [...results],
          pag: {
            page: pageNumber + 1,
            size: pageSize,
            total: totalNumberOfItems,
          },
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-header">My balance</div>
            </div>
          </div>
          <div className="col-7 _uP98xF">
            <div className="card">
              <div className="card-header">Current balance</div>
              <div className="card-body">
                <div
                  className="alert alert-primary"
                  role="alert"
                  style={{ display: "inline-block" }}
                >
                  <b style={{ fontSize: "30px" }}>2000Pt</b>
                </div>
                <button type="button" className="btn btn-outline-primary">
                  Recharge
                </button>
                <hr className="hrdivider" />
                <b style={{ fontSize: "14px" }}>Points locked</b>
                <div className="row">
                  {bids.map((x, i) => {
                    return (
                      <div className="col-12" key={x.oderId}>
                        <div className="media lagus">
                          <div className="media-body">
                            <span className="media-heading mgr_">
                              Bid: <a href="#">{x.product.name}</a>
                            </span>
                            <span className="media-heading">Points locked: 
                            <strong style={{color:"orangered"}}>{x.exchangePoints}</strong></span>&nbsp;
                            <span className="media-heading">Date placed: <strong>{moment(x.created).format("llll")}</strong></span>
                            <button className="btn-outline-warning btn-sm" style={{marginTop:0}}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBalance;
