import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import { Buying, Selling, Products, Reviews, Bundle } from "./pages/Index";

const Account = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  const [data, setData] = useState({
    path: "bun",
  });

  const { path } = data;
  const { FirstName, LastName } = window.currentUser;

  const routes = {
    buy: <Buying />,
    sel: <Selling />,
    prod: <Products />,
    rev: <Reviews />,
    bun: <Bundle />,
  };

  const loadPath = (e) => {
    var route = e.target.getAttribute("data-rt");
    setData((data) => ({
      path: route,
    }));
  };

  const navi = (e) => {};

  console.log("working");
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div class="card" style={{ width: "18rem" }}>
              <span className="sp-st" onClick={() => navigate("/account/settings/")}>
                SETTINGS
              </span>
              <div className="card-body text-center">
                <img className="rounded" src="/img/prof.jpg" />
                <h5 className="card-title">{FirstName + " " + LastName}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <a
                  href="/account/my-balance/"
                  onClick={() => navigate("/account/my-balance/")}
                  data-id="contact"
                  class="list-group-item list-group-item-action"
                >
                  <i class="fas fa-wallet"></i> My Balance
                </a>
                <a
                  href="#"
                  onClick={navi}
                  data-id="contact"
                  class="list-group-item list-group-item-action"
                >
                  <i class="fas fa-star"></i> Favourites
                </a>
                <a
                  href="#"
                  onClick={navi}
                  data-id="contact"
                  class="list-group-item list-group-item-action"
                >
                  <i class="fas fa-comment-alt"></i> Feedback
                </a>
                <a
                  href="#"
                  onClick={navi}
                  data-id="contact"
                  class="list-group-item list-group-item-action"
                >
                  <i class="fas fa-question-circle"></i> Frequently Asked Questions
                </a>
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div class="card">
              <div class="card-header">
                <ul class="nav  justify-content-end">
                  <li class={`nav-item ${path == "buy" ? "active" : ""}`}>
                    <a data-rt="bun" class="nav-link" href="#" onClick={loadPath}>
                      Bundles
                    </a>
                  </li>
                  <li class={`nav-item ${path == "buy" ? "active" : ""}`}>
                    <a data-rt="buy" class="nav-link" href="#" onClick={loadPath}>
                      Buying
                    </a>
                  </li>
                  <li class={`nav-item ${path == "sel" ? "active" : ""}`}>
                    <a data-rt="sel" class="nav-link" href="#" onClick={loadPath}>
                      Selling
                    </a>
                  </li>
                  <li class={`nav-item ${path == "prod" ? "active" : ""}`}>
                    <a data-rt="prod" class="nav-link" href="#" onClick={loadPath}>
                      Products
                    </a>
                  </li>
                  <li class={`nav-item ${path == "rev" ? "active" : ""}`}>
                    <a data-rt="rev" class="nav-link" href="#" onClick={loadPath}>
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">{routes[path]}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
