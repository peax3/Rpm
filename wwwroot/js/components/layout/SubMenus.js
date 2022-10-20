import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import Info from "./Info"


export const SaleSubMenu = (props)=>{

  return <>
     <div className="cus sub-menu">
                                                <div className="container megamenu-content-1200px">
                                                    <div className="row lazy_menu lazyload" data-jspackery='{ "itemSelector": ".sub-column-item","gutter": 0,"percentPosition": true,"originLeft": true }'>
                                                        <div className="type_mn_link2 menu-item sub-column-item col-2">
                                                            <a href="shop-full-width-layout.html">Accessories</a>
                                                            <a href="shop-1600px-layout.html">Footwear</a>
                                                            <a href="shop-filter-options.html">Women</a>
                                                            <a href="shop-left-sidebar.html">T-Shirt</a>
                                                            <a href="shop-right-sidebar.html">Shoes</a>
                                                            <a href="shop-masonry-layout.html">Denim</a>
                                                            <a href="shop-1600px-layout.html">Dress</a>
                                                            <a href="shop-filter-options.html">Men</a>
                                                        </div>
                                                        <div className="type_mn_pr menu-item sub-column-item col-10">
                                                            <div className="prs_nav js_carousel nt_slider products nt_products_holder row al_center row_pr_1 cdt_des_1 round_cd_false nt_cover ratio_nt position_8 flickity-enabled is-draggable" data-flickity='{"imagesLoaded": 0,"adaptiveHeight": 0, "contain": 1, "groupCells": "100%", "dragThreshold" : 5, "cellAlign": "left","wrapAround": 1,"prevNextButtons": 1,"percentPosition": 1,"pageDots": 0, "autoPlay" : 0, "pauseAutoPlayOnHover" : 1, "rightToLeft": false }'>
                                                                <div className="col-lg-3 col-md-12 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                                                    <div className="product-inner pr">
                                                                        <div className="product-image pr oh lazyload">
                                                                        <span className="tc nt_labels pa pe_none cw">
                                                                            <span className="nt_label new">New</span>
                                                                        </span>
                                                                            <a className="d-block" href="product-detail-layout-01.html">
                                                                                <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-01.jpg"></div>
                                                                            </a>
                                                                            <div className="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                                                                <div className="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-02.jpg"></div>
                                                                            </div>
                                                                            <div className="nt_add_w ts__03 pa ">
                                                                                <a href="#" className="wishlistadd cb chp ttip_nt tooltip_right">
                                                                                    <span className="tt_txt">Add to Wishlist</span>
                                                                                    <i className="facl facl-heart-o"></i>
                                                                                </a>
                                                                            </div>
                                                                            <div className="hover_button op__0 tc pa flex column ts__03">
                                                                                <a className="pr nt_add_qv js_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left" href="#">
                                                                                    <span className="tt_txt">Quick view</span>
                                                                                    <i className="iccl iccl-eye"></i>
                                                                                    <span>Quick view</span>
                                                                                </a>
                                                                                <a href="#" className="pr pr_atc cd br__40 bgw tc dib js__qs cb chp ttip_nt tooltip_top_left">
                                                                                    <span className="tt_txt">Quick Shop</span>
                                                                                    <i className="iccl iccl-cart"></i>
                                                                                    <span>Quick Shop</span>
                                                                                </a>
                                                                            </div>
                                                                            <div className="product-attr pa ts__03 cw op__0 tc">
                                                                                <p className="truncate mg__0 w__100">XS, S, M, L, XL</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-info mt__15">
                                                                            <h3 className="product-title pr fs__14 mg__0 fwm">
                                                                                <a className="cd chp" href="product-detail-layout-01.html">Analogue Resin Strap</a>
                                                                            </h3>
                                                                            <span className="price dib mb__5">$30.00</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3 col-md-12 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                                                    <div className="product-inner pr">
                                                                        <div className="product-image pr oh lazyload">

                                                                            <a className="d-block" href="product-detail-layout-01.html">
                                                                                <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-03.jpg"></div>
                                                                            </a>
                                                                            <div className="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                                                                <div className="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-04.jpg"></div>
                                                                            </div>
                                                                            <div className="nt_add_w ts__03 pa ">
                                                                                <a href="#" className="wishlistadd cb chp ttip_nt tooltip_right">
                                                                                    <span className="tt_txt">Add to Wishlist</span>
                                                                                    <i className="facl facl-heart-o"></i>
                                                                                </a>
                                                                            </div>
                                                                            <div className="hover_button op__0 tc pa flex column ts__03">
                                                                                <a className="pr nt_add_qv js_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left" href="#">
                                                                                    <span className="tt_txt">Quick view</span>
                                                                                    <i className="iccl iccl-eye"></i>
                                                                                    <span>Quick view</span>
                                                                                </a>
                                                                                <a href="#" className="pr pr_atc cd br__40 bgw tc dib js__qs cb chp ttip_nt tooltip_top_left">
                                                                                    <span className="tt_txt">Quick Shop</span>
                                                                                    <i className="iccl iccl-cart"></i>
                                                                                    <span>Quick Shop</span>
                                                                                </a>
                                                                            </div>
                                                                            <div className="product-attr pa ts__03 cw op__0 tc">
                                                                                <p className="truncate mg__0 w__100">S, M, L</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-info mt__15">
                                                                            <h3 className="product-title pr fs__14 mg__0 fwm">
                                                                                <a className="cd chp" href="product-detail-layout-01.html">Ridley High Waist</a>
                                                                            </h3>
                                                                            <span className="price dib mb__5">$36.00</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3 col-md-12 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                                                    <div className="product-inner pr">
                                                                        <div className="product-image pr oh lazyload">

                                                                            <a className="d-block" href="product-detail-layout-01.html">
                                                                                <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-05.jpg"></div>
                                                                            </a>
                                                                            <div className="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                                                                <div className="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-06.jpg"></div>
                                                                            </div>
                                                                            <div className="nt_add_w ts__03 pa ">
                                                                                <a href="#" className="wishlistadd cb chp ttip_nt tooltip_right">
                                                                                    <span className="tt_txt">Add to Wishlist</span>
                                                                                    <i className="facl facl-heart-o"></i>
                                                                                </a>
                                                                            </div>
                                                                            <div className="hover_button op__0 tc pa flex column ts__03">
                                                                                <a className="pr nt_add_qv js_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left" href="#">
                                                                                    <span className="tt_txt">Quick view</span>
                                                                                    <i className="iccl iccl-eye"></i>
                                                                                    <span>Quick view</span>
                                                                                </a>
                                                                                <a href="#" className="pr pr_atc cd br__40 bgw tc dib js__qs cb chp ttip_nt tooltip_top_left">
                                                                                    <span className="tt_txt">Quick Shop</span>
                                                                                    <i className="iccl iccl-cart"></i>
                                                                                    <span>Quick Shop</span>
                                                                                </a>
                                                                            </div>
                                                                            <div className="product-attr pa ts__03 cw op__0 tc">
                                                                                <p className="truncate mg__0 w__100">S, M, L</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-info mt__15">
                                                                            <h3 className="product-title pr fs__14 mg__0 fwm">
                                                                                <a className="cd chp" href="product-detail-layout-01.html">Blush Beanie</a>
                                                                            </h3>
                                                                            <span className="price dib mb__5">$15.00</span>
                                                                            <div className="swatch__list_js swatch__list lh__1 nt_swatches_on_grid">
                                                                                <span data-bgset="assets/images/products/pr-05.jpg" className="lazyload nt_swatch_on_bg swatch__list--item pr ttip_nt tooltip_top_right"><span className="tt_txt">Grey</span><span className="swatch__value bg_color_grey"></span></span>
                                                                                <span data-bgset="assets/images/products/pr-31.jpg" className="lazyload nt_swatch_on_bg swatch__list--item pr ttip_nt tooltip_top_right"><span className="tt_txt">Pink</span><span className="swatch__value bg_color_pink"></span></span>
                                                                                <span data-bgset="assets/images/products/pr-32.jpg" className="lazyload nt_swatch_on_bg swatch__list--item pr ttip_nt tooltip_top_right"><span className="tt_txt">Black</span><span className="swatch__value bg_color_black"></span></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3 col-md-12 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                                                    <div className="product-inner pr">
                                                                        <div className="product-image pr oh lazyload">
                                                                        <span className="tc nt_labels pa pe_none cw">
                                                                            <span className="onsale nt_label">
                                                                                <span>-25%</span>
                                                                            </span>
                                                                        </span>
                                                                            <a className="d-block" href="product-detail-layout-01.html">
                                                                                <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-07.jpg"></div>
                                                                            </a>
                                                                            <div className="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                                                                <div className="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-08.jpg"></div>
                                                                            </div>
                                                                            <div className="nt_add_w ts__03 pa ">
                                                                                <a href="#" className="wishlistadd cb chp ttip_nt tooltip_right">
                                                                                    <span className="tt_txt">Add to Wishlist</span>
                                                                                    <i className="facl facl-heart-o"></i>
                                                                                </a>
                                                                            </div>
                                                                            <div className="hover_button op__0 tc pa flex column ts__03">
                                                                                <a className="pr nt_add_qv js_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left" href="#">
                                                                                    <span className="tt_txt">Quick view</span>
                                                                                    <i className="iccl iccl-eye"></i>
                                                                                    <span>Quick view</span>
                                                                                </a>
                                                                                <a href="#" className="pr pr_atc cd br__40 bgw tc dib js__qs cb chp ttip_nt tooltip_top_left">
                                                                                    <span className="tt_txt">Quick Shop</span>
                                                                                    <i className="iccl iccl-cart"></i>
                                                                                    <span>Quick Shop</span>
                                                                                </a>
                                                                            </div>
                                                                            <div className="product-attr pa ts__03 cw op__0 tc">
                                                                                <p className="truncate mg__0 w__100">XS, S, M</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-info mt__15">
                                                                            <h3 className="product-title pr fs__14 mg__0 fwm">
                                                                                <a className="cd chp" href="product-detail-layout-01.html">Cluse La Boheme Rose Gold</a>
                                                                            </h3>
                                                                            <span className="price dib mb__5">
                                                                                <del>$60.00</del>
                                                                                <ins>$45.00</ins>
                                                                            </span>
                                                                            <div className="swatch__list_js swatch__list lh__1 nt_swatches_on_grid">
                                                                                <span data-bgset="assets/images/products/pr-07.jpg" className="nt_swatch_on_bg swatch__list--item pr ttip_nt tooltip_top_right"><span className="tt_txt">Green</span><span className="swatch__value bg_color_green"></span></span>
                                                                                <span data-bgset="assets/images/products/pr-08.jpg" className="nt_swatch_on_bg swatch__list--item pr ttip_nt tooltip_top_right"><span className="tt_txt">Grey</span><span className="swatch__value bg_color_grey"></span></span>
                                                                                <span data-bgset="assets/images/products/pr-06.jpg" className="nt_swatch_on_bg swatch__list--item pr ttip_nt tooltip_top_right"><span className="tt_txt">Blue</span><span className="swatch__value bg_color_blue"></span></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3 col-md-12 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                                                    <div className="product-inner pr">
                                                                        <div className="product-image position-relative oh lazyload">

                                                                            <a className="d-block" href="product-detail-layout-01.html">
                                                                                <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-09.jpg"></div>
                                                                            </a>
                                                                            <div className="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                                                                <div className="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-10.jpg"></div>
                                                                            </div>
                                                                            <div className="nt_add_w ts__03 pa ">
                                                                                <a href="#" className="wishlistadd cb chp ttip_nt tooltip_right">
                                                                                    <span className="tt_txt">Add to Wishlist</span>
                                                                                    <i className="facl facl-heart-o"></i>
                                                                                </a>
                                                                            </div>
                                                                            <div className="hover_button op__0 tc pa flex column ts__03">
                                                                                <a className="pr nt_add_qv js_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left" href="#">
                                                                                    <span className="tt_txt">Quick view</span>
                                                                                    <i className="iccl iccl-eye"></i>
                                                                                    <span>Quick view</span>
                                                                                </a>
                                                                                <a href="#" className="pr pr_atc cd br__40 bgw tc dib js__qs cb chp ttip_nt tooltip_top_left">
                                                                                    <span className="tt_txt">Quick Shop</span>
                                                                                    <i className="iccl iccl-cart"></i>
                                                                                    <span>Quick Shop</span>
                                                                                </a>
                                                                            </div>
                                                                            <div className="product-attr pa ts__03 cw op__0 tc">
                                                                                <p className="truncate mg__0 w__100">S, M</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-info mt__15">
                                                                            <h3 className="product-title position-relative fs__14 mg__0 fwm">
                                                                                <a className="cd chp" href="product-detail-layout-01.html">Mercury Tee</a>
                                                                            </h3>
                                                                            <span className="price dib mb__5">$68.00</span>
                                                                            <div className="swatch__list_js swatch__list lh__1 nt_swatches_on_grid">
                                                                                <span data-bgset="assets/images/products/pr-15.jpg" className="nt_swatch_on_bg swatch__list--item position-relative ttip_nt tooltip_top_right"><span className="tt_txt">White Cream</span><span className="swatch__value bg_color_white-cream lazyload" data-bgset="assets/images/products/dot-01.jpg"></span></span>
                                                                                <span data-bgset="assets/images/products/pr-14.jpg" className="nt_swatch_on_bg swatch__list--item position-relative ttip_nt tooltip_top_right"><span className="tt_txt">Heart Dotted</span><span className="swatch__value bg_color_heart-dotted lazyload" data-bgset="assets/images/products/dot-02.jpg"></span></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3 col-md-12 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                                                                    <div className="product-inner pr">
                                                                        <div className="product-image position-relative oh lazyload">
                                                                        <span className="tc nt_labels pa pe_none cw">
                                                                            <span className="onsale nt_label">
                                                                                <span>-34%</span>
                                                                            </span>
                                                                        </span>
                                                                            <a className="d-block" href="product-detail-layout-01.html">
                                                                                <div className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-11.jpg"></div>
                                                                            </a>
                                                                            <div className="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                                                                <div className="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__127_571" data-bgset="assets/images/megamenu/pr-12.jpg"></div>
                                                                            </div>
                                                                            <div className="nt_add_w ts__03 pa ">
                                                                                <a href="#" className="wishlistadd cb chp ttip_nt tooltip_right">
                                                                                    <span className="tt_txt">Add to Wishlist</span>
                                                                                    <i className="facl facl-heart-o"></i>
                                                                                </a>
                                                                            </div>
                                                                            <div className="hover_button op__0 tc pa flex column ts__03">
                                                                                <a className="pr nt_add_qv js_add_qv cd br__40 pl__25 pr__25 bgw tc dib ttip_nt tooltip_top_left" href="#">
                                                                                    <span className="tt_txt">Quick view</span>
                                                                                    <i className="iccl iccl-eye"></i>
                                                                                    <span>Quick view</span>
                                                                                </a>
                                                                                <a href="#" className="pr pr_atc cd br__40 bgw tc dib js__qs cb chp ttip_nt tooltip_top_left">
                                                                                    <span className="tt_txt">Quick Shop</span>
                                                                                    <i className="iccl iccl-cart"></i>
                                                                                    <span>Quick Shop</span>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="product-info mt__15">
                                                                            <h3 className="product-title position-relative fs__14 mg__0 fwm">
                                                                                <a className="cd chp" href="product-detail-layout-01.html">La Bohème Rose Gold</a>
                                                                            </h3>
                                                                            <span className="price dib mb__5">
                                                                                <del>$60.00</del>
                                                                                <ins>$40.00</ins>
                                                                            </span>
                                                                            <div className="swatch__list_js swatch__list lh__1 nt_swatches_on_grid">
                                                                                <span data-bgset="assets/images/products/pr-27.jpg" className="nt_swatch_on_bg swatch__list--item position-relative ttip_nt tooltip_top_right"><span className="tt_txt">Pink</span><span className="swatch__value bg_color_pink lazyload"></span></span>
                                                                                <span data-bgset="assets/images/products/pr-35.jpg" className="nt_swatch_on_bg swatch__list--item position-relative ttip_nt tooltip_top_right"><span className="tt_txt">Black</span><span className="swatch__value bg_color_black lazyload"></span></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
  </>
}
