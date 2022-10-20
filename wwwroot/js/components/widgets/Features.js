import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Features = (props) => {
  return (
    <>
      <div className="kalles-section nt_section type_shipping bg-white">
            <div className="kalles-electronic-vertical__shiping-info container">
                <div className="row fl_wrap fl_wrap_md oah use_border_true">
                    <div className="col-12 col-md-6 col-lg-4 mb__25">
                        <div className="nt_shipping nt_icon_deafult tl row no-gutters al_center_">
                            <div className="col-auto icon large csi"><i className="las la-life-ring"></i></div>
                            <div className="col content">
                                <h3 className="title cd fs__14 mg__0 mb__5">SUPPORT 24/7</h3>
                                <p className="mg__0">we support 24 hours a day</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb__25">
                        <div className="nt_shipping nt_icon_deafult tl row no-gutters al_center_">
                            <div className="col-auto icon large csi"><i className="las la-sync-alt"></i></div>
                            <div className="col content">
                                <h3 className="title cd fs__14 mg__0 mb__5">30 DAYS RETURN</h3>
                                <p className="mg__0">you have 30 days to return</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb__25">
                        <div className="nt_shipping nt_icon_deafult tl row no-gutters al_center_">
                            <div className="col-auto icon large csi"><i className="las la-user-circle"></i></div>
                            <div className="col content">
                                <h3 className="title cd fs__14 mg__0 mb__5">PAYMENT 100% SECURE</h3>
                                <p className="mg__0">Payment 100% Secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Features;
