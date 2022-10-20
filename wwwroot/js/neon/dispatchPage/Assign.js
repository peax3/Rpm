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

const Assign = (props) => {
  const {setRoute} = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    path: "home",
    updateCat: null,
    users: [],
    userId: "",
    page: 0,
    size: 10,
    count: 0,
    selected: [],
    products: [],
  });

  const { users, userId, page, size, count, selected, products } = data;

  useEffect(() => {
    fetchDispatchers();
    fetchProducts();
  }, []);



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

  const fetchProducts = () => {
    const url = "/neon/GetProductForDispatch";
    $.ajax({
      type: "Get",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { count: count, size: size, page: page + 1 },
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
          products: [...products, ...results],
          page: pageNumber,
          count: totalNumberOfItems,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };



  const saveToDispatcher=()=>{
    var res = confirm("The following selected products wull be added to selected dispatcher");
    if(res){
      $.ajax({
        type: "POST",
        headers: {
          RequestVerificationToken: xrf,
        },
        url: "/neon/AssignProduct",
        data: {
          products: selected.toString(),
          userId: userId,
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("XSRF-TOKEN", xrf);
        },
        "content-type": "application/json",
        success: function(response) {
          setRoute("home");
        },
        failure: function(response) {
          console.log(response);
        },
      });
    }
  }

  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const markProduct = (uid) => {
      if(userId == ""){
          alert("please select a user!");
          return false;
      }
    var oldPicked = [...selected];
    if (oldPicked.includes(uid)) {
      oldPicked = oldPicked.filter((x) => x != uid);
    } else {
      oldPicked = [...oldPicked, uid];
    }

    setData((data) => ({
      ...data,
      selected: [...oldPicked],
    }));
  };

  return (
    <div className="row">
      <div className="col-4" style={{ borderRight: "1px solid lightgrey" }}>
        <form method="post">
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="-userId">Choose a dispatcher</label>
              <select
                className="form-control"
                name="userId"
                onChange={handleFormChange}
              >
                <option value={0}>Select dispatcher</option>
                {users.map((x, i) => {
                  return <option value={x.userId}>{x.firstName}</option>;
                })}
              </select>
            </div>
          </div>
        </form>
      </div>
      <div className="col-8">
        <div className="row">
          {products.map((x, i) => {
            var media = null;
            if (x.media != null) {
              media = JSON.parse(x.media);
            }
            return (
              <div className="col-4" style={{cursor:"pointer"}} onClick={()=>markProduct(x.id)}>
                <img
                  style={{
                    height: "177px",
                    border: selected.includes(x.id)
                      ? "3px solid green"
                      : "inherit",
                  }}
                  class="rounded im"
                  src={`${media == null ? "/img/one.jpg" : media[0].Url}`}
                ></img>
                <h5 class="card-title">{x.name}</h5>
              </div>
            );
          })}
        </div>
      </div>
      {selected.length > 0 && (
        <div className="col-12">
          <hr style={{ margin: "22px 0" }} />
          <button
            className="btn btn-light btn-sm"
            style={{ float: "right" }}
            onClick={saveToDispatcher}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Assign;
