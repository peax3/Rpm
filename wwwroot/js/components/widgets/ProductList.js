import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Product } from ".";

const ProductList = (props) => {
  console.log(props);
  const { showTitle, title, subTitle, data } = props;
  return (
    <>
      <div className="kalles-section nt_section type_featured_collection tp_se_cdt">
        <div className="kalles-jewelry__tabs-section container">
          {showTitle && (
            <div className="wrap_title des_title_2">
              <h3 className="section-title tc pr flex fl_center al_center fs__24 title_2">
                <span className="mr__10 ml__10">{title}</span>
              </h3>
              <span className="dn tt_divider">
                <span></span>
                <i className="dn clprfalse title_2 la-gem"></i>
                <span></span>
              </span>
              <span className="section-subtitle d-block tc sub-title">{subTitle}</span>
            </div>
          )}
          <div
            id="gvXA"
            className="products nt_products_holder row fl_center row_pr_1 tc cdt_des_5 round_cd_true nt_cover ratio_nt position_8 space_30"
          >
            {data.map((x, i) => {
              return <Product key={x.id} product={x} idx={i} title={title} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
