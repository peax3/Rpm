import React, { Component, useState, useEffect, useRef } from "react";

const Slider = (props) => {

  return (
    <>
 <div className="nt_section type_slideshow type_carousel ">
            <div className="slideshow-wrapper nt_full se_height_cus_h nt_first">
                <div className="fade_flick_1 slideshow row no-gutters equal_nt nt_slider js_carousel prev_next_0 btn_owl_1 dot_owl_2 dot_color_1 btn_vi_2" data-flickity='{ "fade":0,"cellAlign": "center","imagesLoaded": 0,"lazyLoad": 0,"freeScroll": 0,"wrapAround": true,"autoPlay" : 0,"pauseAutoPlayOnHover" : true, "rightToLeft": false, "prevNextButtons": false,"pageDots": true, "contain" : 1,"adaptiveHeight" : 1,"dragThreshold" : 5,"percentPosition": 1 }'>
                    <div className="col-12 slideshow__slide">
                        <div className="oh pr nt_img_txt bg-black--transparent">
                            <div className="js_full_ht4 img_slider_block kalles-slide-element__pdb-600">
                                <div className="bg_rp_norepeat bg_sz_cover lazyload item__position center center img_tran_ef pa l__0 t__0 r__0 b__0" data-bgset="assets/images/slide/slider-01.jpg"></div>
                            </div>
                            <div className="caption-wrap caption-w-1 pe_none z_100 tl_md tl">
                                <div className="pa_txts caption kalles-caption-layout-01 kalles-caption--midle-left">
                                    <div className="left_right">
                                        <h4 className="kalles-caption-layout-01__subtitle mg__0 lh__1">SUMMER 2020</h4>
                                        <h3 className="kalles-caption-layout-01__title mg__0 lh__1">New Arrival Collection</h3>
                                        <a className="kalles-caption-layout-01__button kalles-button--square slt4_btn button pe_auto round_false btn_icon_false" href="shop-filter-options.html">Explore Now</a>
                                    </div>
                                </div>
                            </div>
                            <a href="shop.html" className="pa t__0 l__0 b__0 r__0 pe_none"></a>
                        </div>
                    </div>
                    <div className="col-12 slideshow__slide">
                        <div className="oh pr nt_img_txt bg-black--transparent">
                            <div className="js_full_ht4 img_slider_block kalles-slide-element__pdb-600">
                                <div className="bg_rp_norepeat bg_sz_cover lazyload item__position center center img_zoom pa l__0 t__0 r__0 b__0" data-bgset="assets/images/slide/slider-02.jpg"></div>
                            </div>
                            <div className="caption-wrap caption-w-1 pe_none z_100 tr_md tl">
                                <div className="pa_txts caption kalles-caption-layout-01 kalles-caption--midle-right">
                                    <div className="right_left">
                                        <h4 className="kalles-caption-layout-01__subtitle mg__0 lh__1">NEW SEASON</h4>
                                        <h3 className="kalles-caption-layout-01__title mg__0 lh__1">Lookbook Collection</h3>
                                        <a className="kalles-caption-layout-01__button kalles-button--square slt4_btn button pe_auto round_false btn_icon_false" href="shop-filter-options.html">Explore Now</a>
                                    </div>
                                </div>
                            </div>
                            <a href="shop.html" className="pa t__0 l__0 b__0 r__0 pe_none"></a>
                        </div>
                    </div>
                    <div className="col-12 slideshow__slide">
                        <div className="oh pr nt_img_txt bg-black--transparent">
                            <div className="js_full_ht4 img_slider_block kalles-slide-element__pdb-600">
                                <div className="bg_rp_norepeat bg_sz_cover lazyload item__position center center img_tran_ef pa l__0 t__0 r__0 b__0" data-bgset="assets/images/slide/slider-03.jpg"></div>
                            </div>
                            <div className="caption-wrap caption-w-1 pe_none z_100 tl_md tl">
                                <div className="pa_txts caption kalles-caption-layout-01 kalles-caption--midle-left">
                                    <div className="left_right">
                                        <h4 className="kalles-caption-layout-01__subtitle mg__0 lh__1">SUMMER SALE</h4>
                                        <h3 className="kalles-caption-layout-01__title mg__0 lh__1">Save up to 70%</h3>
                                        <a className="kalles-caption-layout-01__button kalles-button--square slt4_btn button pe_auto round_false btn_icon_false" href="shop-filter-options.html">Explore Now</a>
                                    </div>
                                </div>
                            </div>
                            <a href="shop.html" className="pa t__0 l__0 b__0 r__0 pe_none"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Slider;
