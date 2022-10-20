import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BundleList, EditBundle, BundleForm } from "./Index";

const Bundle = (props) => {
  const dispatch = useDispatch();
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    pageNumber: 0,
    pageSize: 10,
    count: 0,
    bundles: [],
    path: "list",
    bundle: null,
  });

  const { bundles, path, pageNumber, pageSize, count, bundle } = data;

  useEffect(() => {
    FetchBundles();
  }, []);

  const FetchBundles = (e) => {
    const url = "/product/FetchBundles";
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
          bundles: [...bundles, ...results],
          page: pageNumber,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const setBundle = (u) => {
    var bund = bundles.find((x) => x.id == u.id);
    console.log(bund);
    setData((data) => ({
      ...data,
      bundle: bund,
      path: "edit",
    }));
  };


  const bundleForm = (u) => {
    var bund = bundles.find((x) => x.id == u.id);
    console.log(bund);
    setData((data) => ({
      ...data,
      bundle: bund,
      path: "form",
    }));
  };

  const setRoute = (pt) => {
    setData((data) => ({
      ...data,
      path: pt,
    }));
  };


  const routes = {
    list: (
      <BundleList bundles={bundles} setBundle={setBundle} bundleForm={bundleForm} setRoute={setRoute} />
    ),
    edit: <EditBundle bundle={bundle} setRoute={setRoute}/>,
    form: <BundleForm bundle={bundle}/>
  };

  return <>{routes[path]}</>;
};

export default Bundle;
