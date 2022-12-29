import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const NewsLetter = (props) => {
  return (
    <>
      <div className="kalles-section nt_section type_newsletter">
        <div className="newsletter_se nt_full content_pos_ color_scheme_dark newl_des_3">
          <div className="kalles-decor__newsletter nt_bg_overlay pr oh cover_norepeat tc">
            <div className="container">
              <div className="wrap_title mb__30 des_title_8">
                <h3 className="section-title tc pr flex fl_center al_center fs__24 title_8">
                  <span className="mr__10 ml__10">subscribe our newsletter</span>
                </h3>
                <span className="dn tt_divider">
                  <span></span>
                  <i className="dn clprfalse title_8 la-pencil-alt"></i>
                  <span></span>
                </span>
                <span className="section-subtitle db tc">
                  Sign up for our newsletter to be updated on the latest designs,
                  exclusive offers, inspiration and tips!
                </span>
              </div>
              <form method="post" action="#" className="mc4wp-form pr z_100">
                <div className="mc4wp-form-fields">
                  <div className="signup-newsletter-form row no-gutters pr oh in_flex">
                    <div className="col-md col-12 col_email">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        className="tc tl_md className_ip input-text"
                        required="required"
                      />
                    </div>
                    <div className="col-md-auto col-12">
                      <button
                        type="submit"
                        className="btn_new_icon_true w__100 submit-btn truncate"
                      >
                        <span>Subscribe</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
