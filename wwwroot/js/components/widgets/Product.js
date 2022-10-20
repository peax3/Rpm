import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { numberWithCommas } from "../../utils/Helpers";
import { setQuickView, setQuickBid } from "../../state/actions/homeAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkIfProductIsNew } from "../../utils/Helpers";
import { Whish } from ".";

const Product = (props) => {
  const { product: p, idx, title } = props;
  const { bookmarked } = p;
  const quickRef = useRef(null);
  const bidRef = useRef(null);
  const dispatch = useDispatch();
  const { trending } = useSelector((state) => state.home);

  useEffect(() => {
    
  }, []);

  const loadQuickBid = (e) => {
    e.preventDefault();
    if(window.currentUser == null){
      window.location.href = "/account/login";
      return false;
    }
    bidRef.current.classList.add("loading");
    bidRef.current.classList.add("curPd");
    if (title == "TRENDING") {
      //the user clicked a product in the trending list
      var viewedProduct = trending.trending[idx];
      dispatch(setQuickBid(viewedProduct));
    }
  };

  const loadQuickView = (e) => {
    e.preventDefault();
    quickRef.current.classList.add("loading");
    quickRef.current.classList.add("curPd");
    if (title == "TRENDING") {
      //the user clicked a product in the trending list
      var viewedProduct = trending.trending[idx];
      dispatch(setQuickView(viewedProduct));
    }
  };

  return (
    <>
      <div className="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
        <div className="product-inner pr">
          <div className="product-image pr oh lazyload">
            {checkIfProductIsNew(p.created) && (
              <span className="tc nt_labels pa pe_none cw">
                <span className="nt_label new">New</span>
              </span>
            )}
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
            <Whish id={p.UserLiked} location={"tooltip_right"} />
            <div className="hover_button op__0 tc pa flex column ts__03">
              <a
                ref={quickRef}
                className="pr nt_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left"
                href="#"
                onClick={loadQuickView}
              >
                <span className="tt_txt">Quick view</span>
                <i className="iccl iccl-eye"></i>
                <span>Quick view</span>
              </a>
              <a
                ref={bidRef}
                href="#"
                className="pr pr_atc cd br__40 bgw tc dib cb chp ttip_nt tooltip_top_left"
                onClick={loadQuickBid}
              >
                <span className="tt_txt">Quick Bid</span>
                <i className="iccl iccl-cart"></i>
                <span>Quick Bid</span>
              </a>
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
            <span className="price dib mb__5">
              <span className="money">UserId: {p.userId}</span>{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
