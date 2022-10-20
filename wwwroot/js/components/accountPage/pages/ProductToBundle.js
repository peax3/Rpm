import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommas } from "../../../utils/Helpers";

const BundleProducts = (props) => {
  const { products, selected, markProduct } = props;
  return (
    <>
      {products.map((p, i) => {
        return (
          <div className="col-lg-3 col-md-3 col-6 pr_animated done pr_grid_item product nt_pr desgin__1">
            <div className="product-inner pr">
              <div className="product-image pr oh lazyload">
                <span className="tc nt_labels pa pe_none cw">
                  {selected.includes(p.id) && (
                    <span
                      className="nt_label new"
                      style={{ height: "30px", width: "30px" }}
                    >
                      <i className="la la-check"></i>
                    </span>
                  )}
                </span>
                <a className="db" onClick={(e) => markProduct(e, p.id)}>
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
    </>
  );
};

const ProductToBundle = (props) => {
  const { bundle, addToBundle } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    pageNumber: 0,
    pageSize: 10,
    count: 0,
    products: [],
    path: "list",
    selected: [],
  });

  const { count, pageNumber, pageSize, products, selected } = data;

  const FetchProducts = (e) => {
    const url = "/product/ProductsToBundle";
    $.ajax({
      type: "Get",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: {
        pageNumber: pageNumber + 1,
        pageSize: pageSize,
        count: count,
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
          count: totalNumberOfItems,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  const markProduct = (e, uid) => {
    e.preventDefault();
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
      {
        <BundleProducts
          products={products}
          markProduct={markProduct}
          selected={selected}
        />
      }
      {selected.length > 0 && (
        <div className="col-12">
          <hr style={{ margin: "22px 0" }} />
          <button
            className="btn btn-light btn-sm"
            style={{ float: "right" }}
            onClick={() => addToBundle(selected)}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductToBundle;
