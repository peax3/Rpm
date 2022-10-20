import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommas } from "../../../utils/Helpers";
import ProductToBundle from "./ProductToBundle";

const BundleProducts = (props) => {
  const { products, removeFromBundle } = props;
  return (
    <div className="row">
      {products.map((p, i) => {
        return (
          <div className="col-lg-3 col-md-3 col-6 pr_animated done pr_grid_item product nt_pr desgin__1">
            <div className="product-inner pr">
              <div className="product-image pr oh lazyload">
                <a className="db" href={`/product/${p.id}`}>
                  <div
                    className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__100"
                    data-bgset="assets/images/home-jewelry/pr-15.jpg"
                  ></div>
                </a>
                <div className="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                  <div
                    className="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__100"
                    data-bgset="assets/images/home-jewelry/pr-16.jpg"
                  ></div>
                </div>
                <div className="hover_button op__0 tc pa flex column ts__03">
                  <a
                    className="pr nt_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left"
                    href="#"
                    onClick={(e) => removeFromBundle(e, p.id)}
                  >
                    <span className="tt_txt">Remove</span>
                    <i className="la la-trash"></i>
                    <span>Remove</span>
                  </a>
                </div>
              </div>
              <div className="product-info mt__15">
                <h3 className="product-title pr fs__14 mg__0 fwm">
                  <a className="cd chp" href="product-detail-layout-01.html">
                    {p.name}
                  </a>
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const EditBundle = (props) => {
  const { bundle } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    pageNumber: 0,
    pageSize: 10,
    count: 0,
    products: [],
    path: "list",
  });

  const { path, pageNumber, pageSize, products } = data;

  useEffect(() => {
    FetchProducts();
  }, []);

  const reload = () => {
    setData((data) => ({
      ...data,
      pageNumber: 0,
      pageSize: 10,
      path: "list",
    }));

    FetchProducts();
  };

  const FetchProducts = (e) => {
    const url = "/product/BundleProducts";
    $.ajax({
      type: "Get",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: {
        pageNumber: pageNumber + 1,
        pageSize: pageSize,
        bundleId: bundle.id,
      },
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
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const removeFromBundle = (e, id) => {
    e.preventDefault();
    var res = confirm("Are you sure you want to remove from bundle");
    if (res) {
      $.ajax({
        type: "Get",
        headers: {
          RequestVerificationToken: xrf,
        },
        url: "/product/RemoveFromBundle",
        data: {
          productId: id,
          bundleId: bundle.id,
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("XSRF-TOKEN", xrf);
        },
        "content-type": "application/json",
        success: function(response) {
          var newP = products.filter((x) => x.id !== id);
          setData((data) => ({
            ...data,
            products: [...newP],
          }));
        },
        failure: function(response) {
          console.log(response);
        },
      });
    }
  };

  const addToBundle = (selected) => {
    var res = confirm("The following selected products wull be added to " + bundle.title + "?");
    if(res){
      $.ajax({
        type: "POST",
        headers: {
          RequestVerificationToken: xrf,
        },
        url: "/product/AddToBundle",
        data: {
          products: selected.toString(),
          bundleId: bundle.id,
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("XSRF-TOKEN", xrf);
        },
        "content-type": "application/json",
        success: function(response) {
          reload();
        },
        failure: function(response) {
          console.log(response);
        },
      });
    }
  };

  const routes = {
    list: (
      <BundleProducts products={products} removeFromBundle={removeFromBundle} />
    ),
    add: (
      <ProductToBundle
        bundle={bundle}
        reload={reload}
        addToBundle={addToBundle}
      />
    ),
  };

  const addProduct = () => {
    setData((data) => ({
      ...data,
      path: "add",
    }));
  };

  return (
    <>
      <div>
        {bundle.title}
        <div style={{ float: "right" }}>
          <button
            className="btn btn-light btn-sm"
            onClick={() => props.setRoute("list")}
          >
            Back
          </button>
          &nbsp;&nbsp;
          {path != "add" && (
            <button className="btn btn-light btn-sm" onClick={addProduct}>
              Add products
            </button>
          )}
        </div>
      </div>
      <div>
        <hr style={{ margin: "22px 0" }} />
      </div>
      {routes[path]}
    </>
  );
};

export default EditBundle;
