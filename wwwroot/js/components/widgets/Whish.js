import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Whish = (props) => {
  const {id, location, productId} = props;
  const wishRef = useRef(null);

  const [data, setData] = useState({
      uid:id
  });

  const {uid} = data;

  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  useEffect(()=>{
    if(uid > 0){
      wishRef.current.classList.add('wis_added');
    }
  }, []);

  const addTo=(e)=>{
    var d = document.getElementById("btnW");
    d.classList.add("loading");
    const url = "/product/AddToWhish";

    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: {
        productId: productId
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      //"content-type": "application/json",
      //dataType: "json",
      success: function(response) {
        
        d.classList.remove('loading');
        if(uid > 0){
          wishRef.current.classList.remove('wis_added');
          setData((data) => ({
            ...data,
            uid:0
          }));
        }else{
          wishRef.current.classList.add('wis_added');
          setData((data) => ({
            ...data,
            uid:10
          }));
        }
      },
      failure: function(response) {
        console.log(response);
      },
    });
  }


  return (
    <>
      <div className="nt_add_w ts__03 pa order-3" ref={wishRef} onClick={addTo}>
        <a href="#" className={`wishlistadd cb chp ttip_nt ${location}`} id="btnW">
          <span className="tt_txt">{id > 0 ? "remove from Wishlist":"Add to Wishlist"}</span>
          <i className="facl facl-heart-o"></i>
        </a>
      </div>
    </>
  );
};

export default Whish;
