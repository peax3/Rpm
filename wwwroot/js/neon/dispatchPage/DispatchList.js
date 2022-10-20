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
import { useRoutes } from "hookrouter";

const DispatchList = (props) => {
  const { setUser } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    path: "home",
    updateCat: null,
    users: [],
  });

  const { users } = data;

  useEffect(() => {
    fetchDispatchers();
  }, []);

  const setRoute = (rt) => {
    setData((data) => ({
      ...data,
      path: rt,
    }));
  };

  const fetchDispatchers = () => {
    const url = "/neon/GetDispatchers";
    $.ajax({
      type: "Get",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          users: response,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  return (
    <>
      {users.map((x, i) => {
        return (
          <div
            className="col-2"
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={() => setUser(x.userId)}
          >
            <img class="rounded" src="/img/prof.jpg"></img>
            <h4 class="card-title">{x.firstName + " " + x.lastName}</h4>
          </div>
        );
      })}
    </>
  );
};

export default DispatchList;
