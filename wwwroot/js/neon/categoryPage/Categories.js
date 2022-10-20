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

const Categories = (props) => {
  const { categories, categoryCount } = useSelector((state) => state.dash);
  const dispatch = useDispatch();
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    path: "home",
    updateCat: null,
  });

  const { path, showUpdate, updateCat } = data;

  useEffect(() => {
    var elem = $("#cat").data("target");
    $(elem).collapse("toggle");
    if (categories.length == 0) {
      fetchCategorySummary(0, 10, 1);
    }
  }, []);

  const fetchCategorySummary = (usrCount, pageSize, page) => {
    const url = "/neon/FetchCategories";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { count: usrCount, pageSize: pageSize, page: page },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        const { totalNumberOfItems, results } = response;
        dispatch(setCategoryCount(totalNumberOfItems));
        dispatch(setCategories(results));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const editCat = (e, cat) => {
    setData((data) => ({
      ...data,
      updateCat: cat,
      path: "update",
    }));
  };

  const deleteCat = (e, cat) => {
    e.preventDefault();
    var res = confirm(`Are you sure you want to delete ${cat.name} category?`);
    if (res) {
      console.log(cat);
      const url = "/neon/deletecat";
      $.ajax({
        type: "DELETE",
        headers: {
          RequestVerificationToken: xrf,
        },
        url: url,
        data: { id: cat.id },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("XSRF-TOKEN", xrf);
        },
        "content-type": "application/json",
        success: function(response) {
          var newCat = [...categories];
          newCat = newCat.filter((x) => x.id != cat.id);
          newCat = newCat.filter((x) => x.parentCategory != cat.id);
          dispatch(setCategoryCount(newCat.length));
          dispatch(setCategories(newCat));
        },
        failure: function(response) {
          console.log(response);
        },
      });
    }
  };



  const setRoute = (pt) => {
    setData((data) => ({
      ...data,
      path: pt,
    }));
  };

  const routes = {
    home: <CatList editCat={editCat} deleteCat={deleteCat}  />,
    update: <EditCat cat={updateCat} />,
    add: <AddCat setRoute={setRoute} />,
  };

  const showAdd = () => {
    setData((data) => ({
      ...data,
      path: "add",
    }));
  };

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Categories
                </h6>
              </div>
              <div className="card-body">
                {path != "add" && (
                  <div style={{ textAlign: "right" }}>
                    <button className="btn btn-info" onClick={showAdd}>
                      New category
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

export default Categories;
