import React, { Component, useState, useEffect, useRef } from "react";
import { usePath, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import { CatList, EditCat, AddCat } from "./Index";
import Layout from "../Layout";
import {
  setUserCount,
  setUsers,
  setCategoryCount,
  setCategories,
} from "../state/actions/dashAction";
import { useRoutes } from "hookrouter";

const DispatchProduct = (props) => {
  const { userId } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    path: "home",
    updateCat: null,
    users: [],
    page: 0,
    size: 10,
    count: 0,
    products: [],
  });

  const { page, size, count, products } = data;
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const url = "/neon/DispatcherProducts";
    $.ajax({
      type: "Get",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { count: count, size: size, page: page + 1, userId: userId },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        const {
          totalNumberOfPages,
          totalNumberOfItems,
          pageNumber,
          pageSize,
          results,
        } = response;
        setData((data) => ({
          ...data,
          products: [...products, ...results],
          page: pageNumber,
          count: totalNumberOfItems,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {products.map((x, i) => {
              var media = null;
              if (x.media != null) {
                media = JSON.parse(x.media);
              }
              return (
                <div
                  className="col-3"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    style={{
                      height: "177px"
                    }}
                    class="rounded im"
                    src={`${media == null ? "/img/one.jpg" : media[0].Url}`}
                  ></img>
                  <h5 class="card-title">{x.name}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DispatchProduct;
