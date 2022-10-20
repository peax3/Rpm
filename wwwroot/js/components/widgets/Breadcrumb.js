import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const BreadCrumb = (props) => {
  return (
    <>
      <div className="bgbl pt__20 pb__20 lh__1">
        <div className="container">
          <div className="row al_center">
            <div className="col">
              <nav className="sp-breadcrumb">
                <a href="index.html">Home</a>
                <i className="facl facl-angle-right"></i>
                <a href="shop-filter-sidebar.html">New Arrival</a>
                <i className="facl facl-angle-right"></i>Blush Beanie
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
