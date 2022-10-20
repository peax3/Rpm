import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";

const Info = (props) => {

  return (
    <>
       <div id="kalles-section-header_top">
                <div className="h__top bgbl pt__10 pb__10 fs__12 flex fl_center al_center">
                    <div className="container">
                        <div className="row al_center">
                            <div className="col-lg-4 col-12 tc tl_lg col-md-12 ">
                                <div className="header-text">
                                    <i className="pegk pe-7s-call"></i> +01 23456789 <i className="pegk pe-7s-mail ml__15"></i>
                                    <a className="cg" href="mailto:kalles@domain.com">Kalles@domain.com</a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-12 tc col-md-12 ">
                                <div className="header-text">Summer sale discount off <span className="cr">50%</span>!
                                    <a href="shop.html">Shop Now</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  );
};

export default Info;
