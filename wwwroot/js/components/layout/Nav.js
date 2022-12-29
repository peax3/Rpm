import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import Info from "./Info";
import { SaleSubMenu } from "./SubMenus";

const Nav = (props) => {
  return (
    <>
      <div className="kalles-header__wrapper ntheader_wrapper pr z_200">
        <Info />
        <div className="sp_header_mid">
          <div className="header__mid">
            <div className="container">
              <div className="row al_center css_h_se">
                <div className="col-md-4 col-3 dn_lg">
                  <a
                    href="#"
                    data-id="#nt_menu_canvas"
                    className="push_side push-menu-btn  lh__1 flex al_center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="16"
                      viewBox="0 0 30 16"
                    >
                      <rect width="30" height="1.5"></rect>
                      <rect y="7" width="20" height="1.5"></rect>
                      <rect y="14" width="30" height="1.5"></rect>
                    </svg>
                  </a>
                </div>
                <div className="col-lg-2 col-md-4 col-6 tc tl_lg">
                  <div className=" branding ts__05 lh__1">
                    <a className="dib" href="/">
                      <img
                        className="w__95 logo_normal dn db_lg"
                        src="/assets/images/svg/kalles.svg"
                        alt="Kalles Template"
                      />
                      <img
                        className="w__100 logo_sticky dn"
                        src="/assets/images/svg/kalles.svg"
                        alt="Kalles Template"
                      />
                      <img
                        className="w__100 logo_mobile dn_lg"
                        src="/assets/images/svg/kalles.svg"
                        alt="Kalles Template"
                      />
                    </a>
                  </div>
                </div>
                <div className="col dn db_lg">
                  <nav className="nt_navigation kl_navigation tc hover_side_up nav_arrow_false">
                    <ul id="nt_menu_id" className="nt_menu in_flex wrap al_center">
                      <li className="type_dropdown menu-item has-children menu_has_offsets menu_right pos_right">
                        <a className="lh__1 flex al_center pr" href="/kids">
                          Kids
                        </a>
                      </li>
                      <li className="type_dropdown menu-item has-children menu_has_offsets menu_right pos_right">
                        <a className="lh__1 flex al_center pr" href="/women">
                          Women
                        </a>
                      </li>
                      <li className="type_mega menu_wid_cus menu-item has-children menu_has_offsets menu_center pos_center">
                        <a
                          className="lh__1 flex al_center pr kalles-lbl__nav-sale"
                          href="shop-filter-sidebar.html"
                        >
                          Sales
                          <span className="lbc_nav">Hot!</span>
                        </a>
                        <SaleSubMenu />
                      </li>
                      <li className="type_dropdown menu-item has-children menu_has_offsets menu_right pos_right">
                        <a className="lh__1 flex al_center pr" href="/men">
                          Men
                        </a>
                      </li>
                      <li className="type_dropdown menu-item has-children menu_has_offsets menu_right pos_right">
                        <a className="lh__1 flex al_center pr" href="/about">
                          About
                        </a>
                      </li>
                      <li className="type_dropdown menu-item has-children menu_has_offsets menu_right pos_right">
                        <a className="lh__1 flex al_center pr" href="/contact-us">
                          Contact Us
                        </a>
                      </li>
                      {window.currentUser && (
                        <li className="type_dropdown menu-item has-children menu_has_offsets menu_right pos_right">
                          <a className="lh__1 flex al_center pr" href="/account/">
                            Account
                          </a>
                          <div className="sub-menu calc_pos">
                            <div className="lazy_menu lazyloaded">
                              <div className="menu-item">
                                <a href="/account/settings/">Settings</a>
                              </div>
                              <div className="menu-item">
                                <a href="/account/logout">Logout</a>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
                <div className="col-lg-auto col-md-4 col-3 tr col_group_btns">
                  <div className="nt_action in_flex al_center cart_des_1">
                    <a
                      className="icon_search push_side cb chp"
                      data-id="#nt_search_canvas"
                      href="#"
                    >
                      <i className="iccl iccl-search"></i>
                    </a>
                    {!window.currentUser && (
                      <div className="my-account ts__05 position-relative dn db_md">
                        <a className="cb chp db push_side" href="/account/">
                          <i className="iccl iccl-user"></i>
                        </a>
                      </div>
                    )}
                    <a
                      className="icon_like cb chp position-relative dn db_md js_link_wis"
                      href="/wishlist"
                    >
                      <i className="iccl iccl-heart pr">
                        <span className="op__0 ts_op pa tcount bgb br__50 cw tc">3</span>
                      </i>
                    </a>
                    <div className="icon_cart pr">
                      <a className="push_side position-relative cb chp db" href="/cart">
                        <i className="iccl iccl-cart pr">
                          <span className="op__0 ts_op pa tcount bgb br__50 cw tc">
                            5
                          </span>
                        </i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
