import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import { Social, Quantity, Whish } from ".";
import {checkIfProductIsNew} from "../../utils/Helpers"

const QuickView = (props) => {
    const {quickView} = useSelector((state) => state.home);
    const {swappable} = quickView;
    
  return (
    <>
    {quickView && <div id="quick-view-tpl" class="dn">
    <div class="product-quickview single-product-content img_action_zoom kalles-quick-view-tpl">
        <div class="row product-image-summary">
            <div class="col-lg-7 col-md-6 col-12 product-images pr oh">
            {checkIfProductIsNew(quickView.created) && <span class="tc nt_labels pa pe_none cw"><span class="nt_label new">New</span></span>}
                <div class="images">
                    <div class="product-images-slider tc equal_nt nt_slider nt_carousel_qv p-thumb_qv nt_contain ratio_imgtrue position_8" data-flickity='{ "fade":true,"cellSelector": ".q-item:not(.is_varhide)","cellAlign": "center","wrapAround": true,"autoPlay": false,"prevNextButtons":true,"adaptiveHeight": true,"imagesLoaded": false, "lazyLoad": 0,"dragThreshold" : 0,"pageDots": true,"rightToLeft": false }'>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-01.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-02.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-03.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-04.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-05.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-06.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-07.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-08.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-09.jpg"></span>
                        </div>
                        <div data-grname="not4" data-grpvl="ntt4" class="js-sl-item q-item sp-pr-gallery__img w__100" data-mdtype="image">
                            <span class="nt_bg_lz lazyload" data-bgset="assets/images/quick_view/pr-10.jpg"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-md-6 col-12 summary entry-summary pr">
                <div class="summary-inner gecko-scroll-quick">
                    <div class="gecko-scroll-content-quick">
                        <div class="kalles-section-pr_summary kalles-section summary entry-summary mt__30">
                            <h1 class="product_title entry-title fs__16"><a href="product-detail-layout-01.html">{quickView.name}</a></h1>
                            <div class="flex wrap fl_between al_center price-review">
                                <p class="price_range" id="price_qv">
                                    <ins>$40.00</ins>
                                </p>
                                <a href="product-detail-layout-01.html" class="rating_sp_kl dib">
                                    <div class="kalles-rating-result">
                                    <span class="kalles-rating-result__pipe">
                                        <span class="kalles-rating-result__start"></span>
                                        <span class="kalles-rating-result__start"></span>
                                        <span class="kalles-rating-result__start"></span>
                                        <span class="kalles-rating-result__start active"></span>
                                        <span class="kalles-rating-result__start"></span>
                                    </span>
                                        <span class="kalles-rating-result__number">(12 reviews)</span>
                                    </div>
                                </a>
                            </div>
                            <div class="pr_short_des">
                                <p class="mg__0">{quickView.description}</p>
                            </div>
                            <div class="btn-atc atc-slide btn_des_1 btn_txt_3">
                                <div id="callBackVariant_qv" class="nt_pink nt1_ nt2_">
                                    <div id="cart-form_qv" class="nt_cart_form variations_form variations_form_qv">
                                        <div class="variations_button in_flex column w__100 buy_qv_false">
                                            <div class="flex wrap">
                                                <Quantity count={quickView.quantity}/>
                                                <Whish id={quickView.id} location={"tooltip_top_left"}/>
                                                <button type="submit" data-time='6000' data-ani='shake' class="single_add_to_cart_button button truncate js_frm_cart w__100 mt__20 order-4">
                                                    <span class="txt_add ">
                                                    {quickView.bookmarked == 0
                                                    ? "Add to cart"
                                                    : "remove item"}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="product_meta">
                                <span class="posted_in"><span class="cb">Categories:</span> <a href="shop-filter-options.html" class="cg" title="Accessories">Accessories</a>, <a href="shop-filter-options.html" class="cg" title="All">All</a>, <a href="shop-filter-options.html" class="cg" title="Best seller">Best seller</a>, <a href="shop-filter-options.html" class="cg" title="New Arrival">New Arrival</a>, <a href="shop-filter-options.html" class="cg" title="Sale">Sale</a>, <a href="shop-filter-options.html" class="cg" title="Watches">Watches</a>, <a href="shop-filter-options.html" class="cg" title="Women">Women</a></span>
                                <span class="tagged_as"><span class="cb">Tags:</span> <a href="shop-filter-options.html" class="cg" title="Color Black">Color Black</a>, <a href="shop-filter-options.html" class="cg" title="Color Pink">Color Pink</a>, <a href="shop-filter-options.html" class="cg" title="Price $7-$50">Price $7-$50</a>, <a href="shop-filter-options.html" class="cg" title="Vendor Kalles">Vendor Kalles</a>, <a href="shop-filter-options.html" class="cg" title="Watch">Watch</a>, <a href="shop-filter-options.html" class="cg" title="women">women</a></span>
                                <span class="tagged_as"><span class="cb">Swappable:</span> <a  class="cg" >{swappable ? "Yes": "No"}</a></span>
                            </div>
                            <Social/>
                            <a href={`/product/${quickView.id}`} class="btn fwsb detail_link p-0 fs__14">View full details<i class="facl facl-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>}
    </>
  );
};

export default QuickView;
