import React, { Component, useState, useEffect, useRef } from "react";
import { setQuickView, setQuickBid } from "../../state/actions/homeAction";
import { QuickView, QuickShop, ProductList } from "../widgets";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams, navigate } from "hookrouter";
const Board = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const { quickView, swaps, quickBid } = useSelector((state) => state.home);
  const [queryParams, setQueryParams] = useQueryParams();

  console.log(queryParams);
  const [data, setData] = useState({
    page: 0,
    size: 0,
    count: 0,
    products: [],
    states: [],
    title: "",
    minimum: 0,
    maximum: 0,
    stateId: 0,
    catId: 0,
  });

  const {
    page,
    size,
    count,
    products,
    title,
    minimum,
    maximum,
    stateId,
    states,
    catId,
  } = data;

  const FetchStates = () => {
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: "/home/FetchStates",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      contentType: false,
      processData: false,
      success: function(response) {
        setData((data) => ({
          ...data,
          states: response,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const loadProducts = () => {
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: "/home/FetchProducts",
      data: {
        catId: catId,
        page: page + 1,
        size: size,
        count: count,
        maximum: maximum,
        minimum: minimum,
        stateId: stateId,
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
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

  useEffect(() => {
    document.getElementById("gvXA").style.borderRight = "1px solid lightgray";

    var cat = window.location.pathname.split("/").pop();
    var allowedCats = ["men", "women", "kids"];
    if (!allowedCats.includes(cat)) {
    }
    const {
      PageNumber,
      PageSize,
      Results,
      TotalNumberOfItems,
      TotalNumberOfPages,
    } = window.product;

    setData((data) => ({
      ...data,
      page: PageNumber,
      size: PageSize,
      products: Results,
      count: TotalNumberOfItems,
      title: cat,
      catId: TotalNumberOfPages, //i passed the categoryId here
    }));
    FetchStates();
  }, []);

  useEffect(() => {
    console.log("i ran");
    if (quickView != null) {
      $.fn.kallesLoadQuickView();
      //remove all loading
      var doms = document.getElementsByClassName("curPd");
      for (let index = 0; index < doms.length; index++) {
        const element = doms[index];
        element.classList.remove("loading");
      }
    }
  }, [quickView]);

  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const filterProduct = (e) => {
    e.preventDefault();
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: "/home/FetchProducts",
      data: {
        catId: catId,
        page: 1,
        size: size,
        count: 0,
        maximum: maximum,
        minimum: minimum,
        stateId: stateId,
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
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
          products: [...results],
          page: pageNumber,
          count: totalNumberOfItems,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  return (
    <>
      {/* mask overlay */}
      <div className="mask-overlay ntpf t__0 r__0 l__0 b__0 op__0 pe_none"></div>
      {/* end mask overlay */}
      {quickView && <QuickView />}
      {quickBid && (
        <QuickShop route={quickShopRoute} changeRoute={changeQuickShopRoute} />
      )}
      <div className="container">
        <div className="row">
          <div className="col-10">
            <br />
            <ProductList
              showTitle={true}
              data={products}
              title={title.toUpperCase()}
              subTitle={`Products in ${title} category`}
            />
            {count != products.length && (
              <>
                <br />
                <div style={{ textAlign: "center" }}>
                  <button className="btn btn-light btn-lg" onClick={loadProducts}>
                    Load more
                  </button>
                </div>
                <br />
              </>
            )}
          </div>
          <div className="col-2">
            <br />
            <br />
            <br />
            <form method="post">
              <div asp-validation-summary="All" className="text-danger"></div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="-minimum">Minimum price</label>
                  <input
                    type="number"
                    name="minimum"
                    className="form-control"
                    id="-minimum"
                    onChange={handleFormChange}
                    value={minimum}
                    required
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="-maximum">Maximum price</label>
                  <input
                    type="number"
                    name="maximum"
                    className="form-control"
                    id="-maximum"
                    onChange={handleFormChange}
                    value={maximum}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="-CategoryId">State</label>
                  <select
                    name="stateId"
                    onChange={handleFormChange}
                    style={{ borderRadius: "inherit" }}
                  >
                    <option value={0}>Select state</option>
                    {states.map((x, i) => {
                      return (
                        <option key={i} value={x.id}>
                          {x.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={filterProduct}>
                Filter
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
