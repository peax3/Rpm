import React, { Component, useState, useEffect, useRef } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

const Stickycart = (props) => {

  const {Id, name} = window.product;

  return createPortal(
    <div className="sticky_atc_wrap mobile_true pf b__0 l__0 r__0 pt__10 pb__10 bgw z_100 sticky_atc_shown">
      <div className="container">
        <div className="row al_center fl_center">
          <div className="col sticky_atc_content">
            <div className="row no-gutters al_center">
              <div className="col-auto sticky_atc_thumb mr__10 flex al_center">
                <img
                  alt=""
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  data-src="assets/images/single-product/thumb-sticky.jpg"
                  className="lazyload w__100 lz_op_ef"
                />
              </div>
              <div className="col sticky_atc_info">
                <h4 className="fs__14 mg__0">{name}</h4>
                <span className="txt_under sticky_atc_a cp fwm">Grey / S</span>
              </div>
            </div>
          </div>
          <div className="col-auto sticky_atc_btn variations_form flex wrap al_center fl_center">
            <div className="txt_under sticky_atc_a cp fwm dn tc truncate mr__10">
              Grey / S
            </div>
            <div className="sticky_atc_price">$15.00</div>
            <div className="quantity pr ml__10 mr__10">
              <input
                type="number"
                className="input-text qty text tc js_sticky_qty qty_cart_js"
                min="0"
                max="9999"
                name="quantity"
                value="1"
              />
              <div className="qty tc fs__14">
                <a className="plus db cb pa pr__15 tr r__0" href="#">
                  <i className="facl facl-plus"></i>
                </a>
                <a className="minus db cb pa pl__15 tl l__0" href="#">
                  <i className="facl facl-minus"></i>
                </a>
              </div>
            </div>
            <button
              data-time="6000"
              data-ani="none"
              className="single_add_to_cart_button button truncate sticky_atc_js"
            >
              <span className="txt_add">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("kalles-section-sticky_atc")
  );
};
export default Stickycart;
