import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Rating = (props) => {
  return (
    <>
     <div className="flex wrap fl_between al_center price-review">
            <p className="price_range" id="price_ppr">$15.00</p>
            <a href="#tab_reviews_product" className="rating_sp_kl dib">
               <div className="kalles-rating-result">
                  <span className="kalles-rating-result__pipe">
                  <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                  <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                  <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                  <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                  <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                  </span>
                  <span className="kalles-rating-result__number">(12 reviews)</span>
               </div>
            </a>
         </div>
    </>
  );
};

export default Rating;
