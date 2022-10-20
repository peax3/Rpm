import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Quantity = (props) => {
  const  {count, isOwner} = props;

  return (
    <>
      <div
        className="quantity pr mr__10 order-1 qty__true d-inline-block"
        id="sp_qty_ppr"
      >
        <input
          type="number"
          className="input-text qty text tc qty_pr_js qty_cart_js"
          name="quantity"
          value="1"
          data-max={count}
          id="qkshp"
        />
        <div className="qty tc fs__14">
          <button type="button" className="plus db cb pa pd__0 pr__15 tr r__0" disabled={isOwner}>
            <i className="facl facl-plus"></i>
          </button>
          <button type="button" className="minus db cb pa pd__0 pl__15 tl l__0" disabled={isOwner}>
            <i className="facl facl-minus"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Quantity;
