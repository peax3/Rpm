import React, { Component, useState, useEffect, useRef } from "react";
import Slider from "./Slider";
import { NewsLetter, Features } from "../widgets";

const Collection = (props) => {
  return (
    <>
  <div className="kalles-section nt_section type_packery type_collection_list">
            <div className="kalles-jewelry__banner-collection container">
                <div className="js_packery mt__30 nt_cats_holder row equal_nt hoverz_false cat_space_30 cat_design_6" data-packery='{ "itemSelector": ".cat_grid_item","gutter": 0,"percentPosition": true,"originLeft": true }'>
                    <div className="col-md-3 cat_grid_item dn"></div>
                    <div className="cat_grid_item cat_space_item cat_grid_item_1 col-lg-3 col-md-3 col-6">
                        <div className="cat_grid_item__content pr oh">
                            <a href="shop-left-sidebar.html" className="db cat_grid_item__link">
                                <div className="cat_grid_item__overlay item__position nt_bg_lz lazyload center padding-top__92_700" data-bgset="assets/images/home-jewelry/banner-collection-01.png"></div>
                            </a>
                            <div className="cat_grid_item__wrapper pe_none">
                                <div className="cat_grid_item__title">BRACELETS</div>
                            </div>
                        </div>
                    </div>
                    <div className="cat_grid_item cat_space_item cat_grid_item_2 col-lg-6 col-md-6 col-12">
                        <div className="cat_grid_item__content pr oh">
                            <a href="shop-left-sidebar.html" className="db cat_grid_item__link">
                                <div className="cat_grid_item__overlay item__position nt_bg_lz lazyload center padding-top__43_859" data-bgset="assets/images/home-jewelry/banner-collection-02.png"></div>
                            </a>
                        </div>
                    </div>
                    <div className="cat_grid_item cat_space_item cat_grid_item_3 col-lg-3 col-md-3 col-12">
                        <div className="cat_grid_item__content pr oh">
                            <a href="shop-left-sidebar.html" className="db cat_grid_item__link">
                                <div className="cat_grid_item__overlay item__position nt_bg_lz lazyload center padding-top__195_604" data-bgset="assets/images/home-jewelry/banner-collection-03.png"></div>
                            </a>
                            <div className="cat_grid_item__wrapper pe_none">
                                <div className="cat_grid_item__title">ACCESSORIES</div>
                            </div>
                        </div>
                    </div>
                    <div className="cat_grid_item cat_space_item cat_grid_item_4 col-lg-6 col-md-6 col-12">
                        <div className="cat_grid_item__content pr oh">
                            <a href="shop-left-sidebar.html" className="db cat_grid_item__link">
                                <div className="cat_grid_item__overlay item__position nt_bg_lz lazyload center padding-top__43_328" data-bgset="assets/images/home-jewelry/banner-collection-04.png"></div>
                            </a>
                            <div className="cat_grid_item__wrapper pe_none">
                                <div className="cat_grid_item__title">ENGAGEMENT</div>
                            </div>
                        </div>
                    </div>
                    <div className="cat_grid_item cat_space_item cat_grid_item_5 col-lg-3 col-md-3 col-6">
                        <div className="cat_grid_item__content pr oh">
                            <a href="shop-left-sidebar.html" className="db cat_grid_item__link">
                                <div className="cat_grid_item__overlay item__position nt_bg_lz lazyload center padding-top__92_700" data-bgset="assets/images/home-jewelry/banner-collection-05.png"></div>
                            </a>
                            <div className="cat_grid_item__wrapper pe_none">
                                <div className="cat_grid_item__title">NECKLACE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Collection;
