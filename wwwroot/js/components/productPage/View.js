import React, { Component, useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  Stickycart,
  Thumbnails,
  Social,
  Whish,
  Quantity,
  Rating,
} from "../widgets";
import Reviews from "./Reviews";

const View = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  var isOwner;
  if (window.currentUser == null) {
    isOwner = false;
  } else {
    isOwner = currentUser.UserId == product.userId;
  }

  const [data, setData] = useState({
    p: product,
    isBookmarked: product.bookmarked == 0,
    medias:[]
  });

  const { p, isBookmarked, medias } = data;


  useEffect(()=>{
      if(!isOwner){
        pulse();
      }
      console.log(p)
      if(p.Media != null){
        //we have images
        var thumbnails = JSON.parse(p.Media);
        console.log(thumbnails);
        setData((data) => ({
          ...data,
          medias: thumbnails,
        }));
      }
  }, []);


  const add2Kart = (e) => {
    if (window.order != null) {
      alert("Product already bidded for!");
      return false;
    }
    addToCart();
  };

  const pulse = () => {
    const url = "/pulse";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { dt_src: p.Id, pulse:0 },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      //dataType: "json",
      success: function(response) {
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };


  const addToCart = () => {
    const url = "/product/AddToCart";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { id: p.Id },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      //dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          isBookmarked: !isBookmarked,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  return (
    <>
      <div id="nt_content">
        <div className="sp-single sp-single-1 des_pr_layout_1 mb__60">
          <Breadcrumb />
          <div className="container container_cat cat_default">
            <div className="row product mt__40">
              <div className="col-md-12 col-12 thumb_left">
                <div className="row mb__50 pr_sticky_content">
                  <Thumbnails medias={medias}/>
                  <div className="col-md-6 col-12 product-infors pr_sticky_su">
                    <div className="theiaStickySidebar">
                      <div className="kalles-section-pr_summary kalles-section summary entry-summary mt__30">
                        <h1 className="product_title entry-title fs__16">
                          {p.name}
                        </h1>
                        <Rating />
                        <div className="pr_short_des">
                          <p className="mg__0">{p.Description}</p>
                        </div>
                        <div className="btn-atc atc-slide btn_des_1 btn_txt_3">
                          <div id="callBackVariant_ppr">
                            <div className="nt_cart_form variations_form variations_form_ppr">
                              <div className="variations_button in_flex column w__100 buy_qv_false">
                                <div className="flex wrap">
                                  <Quantity
                                    count={p.quantity}
                                    isOwner={isOwner}
                                  />
                                  <Whish
                                    id={p.UserLiked}
                                    location={"tooltip_top_left"}
                                    productId={p.Id}
                                  />
                                  <button
                                    id="js_u2_1"
                                    onClick={add2Kart}
                                    className="button truncate w__100 mt__20 order-4 d-inline-block animated"
                                  >
                                    <span className="txt_add ">
                                      {!isBookmarked
                                        ? "Add to cart"
                                        : "remove item"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="extra-link mt__35 fwsb">
                          <a
                            className="ajax_pp_js cd chp mr__20"
                            href="#"
                            data-id="#popup-delivery-and-return"
                          >
                            Delivery &amp; Return
                          </a>
                          <a
                            className="ajax_pp_js cd chp"
                            href="#"
                            data-id="#popup-ask-a-question"
                          >
                            Ask a Question
                          </a>
                        </div>
                        <div className="product_meta">
                          <span className="posted_in">
                            <span className="cb">Categories:</span>{" "}
                            <a href="shop-filter-options.html" className="cg">
                              All
                            </a>
                          </span>
                          <span className="tagged_as">
                            <span className="cb">Tags:</span>{" "}
                            <a href="shop-filter-options.html" className="cg">
                              Color Black
                            </a>
                          </span>
                          <span className="tagged_as">
                            <span className="cb">Uploader:</span>{" "}
                            <a href={`/users/${p.username}`} className="cg">
                              {p.username}
                            </a>
                          </span>
                          {p.ViewCount > 0 && <span className="tagged_as">
                            <span className="cb">Number of views:</span>{" "}
                            <a className="cg">
                              {p.ViewCount}
                            </a>
                          </span>}
                          {p.OrderCount > 0 && <span className="tagged_as">
                            <span className="cb">Number of orders:</span>{" "}
                            <a className="cg">
                              {p.OrderCount}
                            </a>
                          </span>}
                        </div>
                        <Social />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Reviews />
        </div>
      </div>
      <Stickycart />
    </>
  );
};

export default View;
