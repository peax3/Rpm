import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { numberWithCommas } from "../../../utils/Helpers";
const Products = (props) => {
  const dispatch = useDispatch();
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    pageNumber: 0,
    pageSize: 10,
    count: 0,
    feeds: [],
  });
  
  const { pageNumber, pageSize, count, feeds } = data;
  
  useEffect(() => {
    FetchProducts();
  }, []);

  const FetchProducts = (e) => {
    const url = "/product/UploadedProducts";
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
          feeds: [...feeds, ...results],
          page: pageNumber,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const navigateToProduct =()=>{
    window.location.href = "/product/add";
  }

  return (
    <>
      <div className="kalles-section nt_section type_featured_collection tp_se_cdt">
        <div style={{textAlign:"right"}}>
        <button className="btn btn-sucess" onClick={navigateToProduct}>Add product</button>
        </div>
        <div className="kalles-jewelry__tabs-section container">
          <div className="products nt_products_holder row fl_center row_pr_1 tc cdt_des_5 round_cd_true nt_cover ratio_nt position_8 space_30">
            {feeds.map((p, i) => {
              return  <div className="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
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
                </div>
                <div className="product-info mt__15">
                  <h3 className="product-title pr fs__14 mg__0 fwm">
                    <a className="cd chp" href="product-detail-layout-01.html">
                      {p.name}
                    </a>
                  </h3>
                  <span className="price dib mb__5">
                    <span className="money">₦{numberWithCommas(p.price)}</span>{" "}
                  </span>
                </div>
              </div>
            </div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
