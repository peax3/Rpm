import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Bids from "../widgets/Bids"

const Reviews = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();



  return (
    <>
       <div id="wrap_des_pr">
                <div className="container container_des">
                    <div className="kalles-section-pr_description kalles-section kalles-tabs sp-tabs nt_section">
                        <ul className="ul_none ul_tabs is-flex fl_center fs__16 des_mb_2 des_style_1">
                            <li className="tab_title_block active">
                                <a className="db cg truncate pr" href="#tab_product_description">Description</a>
                            </li>
                            <li className="tab_title_block">
                                <a className="db cg truncate pr" href="#tab_reviews_product">Reviews</a>
                            </li>
                            <li className="tab_title_block">
                                <a className="db cg truncate pr" href="#tab_productx_bids">Bids</a>
                            </li>
                        </ul>
                        <div className="panel entry-content sp-tab des_mb_2 des_style_1 active" id="tab_product_description">
                            <div className="js_ck_view"></div>
                            <div className="heading bgbl dn">
                                <a className="tab-heading flex al_center fl_between pr cd chp fwm" href="#tab_product_description"><span className="txt_h_tab">Description</span><span className="nav_link_icon ml__5"></span></a>
                            </div>
                            <div className="sp-tab-content">
                                <p className="mb__40 cb">
                                    Design inspiration lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse
                                    id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus
                                    nunc ullamcorper orci.
                                </p>
                               
                            </div>
                        </div>
                      
                        <div className="panel entry-content sp-tab des_mb_2 des_style_1 dn" id="tab_reviews_product">
                            <div className="js_ck_view"></div>
                            <div className="heading bgbl dn">
                                <a className="tab-heading flex al_center fl_between pr cd chp fwm" href="#tab_reviews_product"><span className="txt_h_tab">Reviews</span><span className="nav_link_icon ml__5"></span></a>
                            </div>
                            <div className="sp-tab-content">
                                <div className="lt-block-reviews">
                                    <div className="r--desktop r--tablet w__100">
                                        <div id="r--masonry-theme" className="r--show-part-preview">
                                            <div className="r--masonry-theme">
                                                <div className="header-v1 masonry-header">
                                                    <div className="r--header">
                                                        <div className="r--filter-review">
                                                            <div className="r--filter-wrapper">
                                                                <div className="r--sortBy">
                                                                    <div className="r--unset-select r--sort-button r--filter-link r--flex-center el-popover__reference">
                                                                        <span className="r--select">Sort by: Latest </span>
                                                                        <img src="assets/images/single-product/icon-down.svg" width="8" height="4" className="r--select r--icon-down" alt=""/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="r--showing r--f-left">
                                                                <span className="r--text-showing">Showing 1 - 6 of 13 reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="r--grid">
                                                    <div className="r--grid-item">
                                                        <div className="r--author r--text-limit">
                                                            <div className="r--avatar-default text-center text-white">P</div>
                                                            <span className="r--author-review">Peter</span>
                                                        </div>
                                                        <div className="r--item-body">
                                                            <div className="r--item-body-top">
                                                                <div className="r--stars-author r--star-head r--body-item r--flex-center">
                                                                    <div className="kalles-rating-result">
                                                                        <span className="kalles-rating-result__pipe">
                                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="r--title-review r--body-item">Contrary to popular belief</p>
                                                            <p className="r--content-review r--body-item">It is a long established fact that a reader will be distracted by the readable content of a page </p>
                                                            <time dateTime="2020-01-28T17:29:54Z" className="r--date-review r--top r--text-limit">15 days ago</time>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="r--load-more">
                                                    <a href="#" className="r--text-load-more">Load more</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel entry-content sp-tab des_mb_2 des_style_1 dn" id="tab_productx_bids">
                            <div className="js_ck_view"></div>
                            <div className="heading bgbl dn">
                                <a className="tab-heading flex al_center fl_between pr cd chp fwm" href="#tab_productx_bids"><span className="txt_h_tab">Reviews</span><span className="nav_link_icon ml__5"></span></a>
                            </div>
                            <div className="sp-tab-content">
                                <Bids productId ={window.product.Id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  );
};

export default Reviews;
