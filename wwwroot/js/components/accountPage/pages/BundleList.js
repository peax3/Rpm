import React, { Component, useState, useEffect, useRef } from "react";

const BundleList = (props) => {
  const { bundles, setBundle,bundleForm } = props;

  return (
    <>
      <div class="row cjvZAQ">
        {bundles.map((x, i) => {
          var media = null;
          if(x.banner != null){
            media = JSON.parse(x.banner);
          }
          return (
            <div class="card col-4"  style={{ padding: "inherit", marginBottom:"5px" }}>
              <img
                class="card-img-top"
                src={`/${media == null ? "img/one.jpg" : media.Url}`}
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">{x.title}</h5>
                <p class="card-text">
                  {x.description}
                </p>
              </div>
              <div class="card-footer">
                    <button className="btn btn-light btn-sm" onClick={()=>bundleForm(x)}>Edit</button>
                    <button className="btn btn-light btn-sm" onClick={()=>setBundle(x)}>View</button>
                </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BundleList;
