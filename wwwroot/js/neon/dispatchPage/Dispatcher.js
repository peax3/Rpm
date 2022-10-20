import React, { Component, useState, useEffect, useRef } from "react";
import { usePath, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import { CatList, EditCat, AddCat } from "./Index";
import Layout from "../Layout";
import {
  setUserCount,
  setUsers,
  setCategoryCount,
  setCategories,
} from "../state/actions/dashAction";
import DispatchList from "./DispatchList";
import DispatchProduct from "./DispatchProduct";
import Assign from "./Assign";
const Dispatcher = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    path: "home",
    updateCat: null,
    userId: "",
  });

  const { path,userId } = data;

  useEffect(() => {}, []);

  const setRoute = (rt) => {
    setData((data) => ({
      ...data,
      path: rt,
    }));
  };

  const setUser = (user) => {
    setData((data) => ({
      ...data,
      userId: user,
      path: "products",
    }));
  };

  const routes = {
    home: <DispatchList setUser={setUser} />,
    products: <DispatchProduct userId={userId}/>,
    add: <Assign setRoute={setRoute} />,
  };

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Dispatcher
                </h6>
              </div>
              <div className="card-body">
                {path != "add" && (
                  <div style={{ textAlign: "right" }}>
                    <button
                      className="btn btn-info"
                      onClick={() => setRoute("add")}
                    >
                      Assign products
                    </button>
                  </div>
                )}
                <br />
                {routes[path]}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dispatcher;
