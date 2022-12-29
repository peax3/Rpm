import React, { Component, useState, useEffect, useRef } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

const Search = (props) => {
  useEffect(() => {
    console.log("search module landed!");
  }, []);

  return (
    <div id="nt_search_canvas" className="nt_fk_canvas dn">
      <div className="nt_mini_cart flex column h__100">
        <div className="mini_cart_header flex fl_between al_center">
          <h3 className="widget-title tu fs__16 mg__0 font-poppins">Search Our Site</h3>
          <i className="close_pp pegk pe-7s-close ts__03 cd"></i>
        </div>
        <div className="mini_cart_wrap">
          <div className="search_header mini_search_frm pr js_frm_search" role="search">
            <div className="frm_search_cat mb__20">
              <select name="product_type">
                <option value="Catalog">Catalog</option>
                <option value="Users">Users</option>
              </select>
            </div>
            <div className="frm_search_input pr oh">
              <input
                className="search_header__input js_iput_search placeholder-black"
                autoComplete="off"
                type="text"
                name="q"
                placeholder="Search for products"
              />
              <button className="search_header__submit js_btn_search" type="submit">
                <i className="iccl iccl-search"></i>
              </button>
            </div>
            <div className="ld_bar_search"></div>
          </div>
          <div className="search_header__prs fwsb cd">
            <span className="h_suggest">Need some inspiration?</span>
            <span className="h_result dn">Search Result:</span>
            <span className="h_results dn">Search Results:</span>
          </div>
          <div className="search_header__content mini_cart_content fixcl-scroll widget">
            <div className="fixcl-scroll-content product_list_widget">
              <div className="js_prs_search">
                <div className="row mb__10 pb__10">
                  <div className="col widget_img_pr">
                    <a className="d-block pr oh" href="#">
                      <img
                        src="data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201200%201200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3C%2Fsvg%3E"
                        className="w__100 lz_op_ef lazyload"
                        alt="sunlight bell solar lamp"
                        data-src="assets/images/mini-cart/product-01.jpg"
                        width="80"
                        height="80"
                      />
                    </a>
                  </div>
                  <div className="col widget_if_pr">
                    <a className="product-title d-block" href="#">
                      sunlight bell solar lamp
                    </a>
                    $35.00
                  </div>
                </div>

                <a href="#" className="btn fwsb detail_link">
                  View All
                  <i className="las la-arrow-right fs__18"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
