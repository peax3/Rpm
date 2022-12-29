import React, { Component, useState, useEffect, useRef } from "react";
import Slider from "./Slider";
import { setQuickView, setQuickBid } from "../../state/actions/homeAction";
import {
  NewsLetter,
  Features,
  ProductList,
  QuickView,
  QuickShop,
  Search,
} from "../widgets";
import { setHomeTrending } from "../../state/actions/homeAction";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "hookrouter";

const Home = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const dispatch = useDispatch();
  const { quickView, swaps, quickBid } = useSelector((state) => state.home);
  const [queryParams] = useQueryParams();

  const [data, setData] = useState({
    trending: [],
    trenPag: { pageNumber: 1, pageSize: 10 },
    quickShopRoute: "home",
    canMove: false,
    quickBidType: "",
    openConfirmModal: false,
  });

  const {
    trending,
    trenPag,
    quickShopRoute,
    canMove,
    quickBidType,
    openConfirmModal,
  } = data;

  console.log(queryParams);

  useEffect(() => {
    if (quickBid != null) {
      $.fn.kallesLoadQuikShop();
      //remove all loading
      var doms = document.getElementsByClassName("curPd");
      for (let index = 0; index < doms.length; index++) {
        const element = doms[index];
        element.classList.remove("loading");
      }
    }
  }, [quickBid]);

  useEffect(() => {
    if (quickView != null) {
      $.fn.kallesLoadQuickView();
      //remove all loading
      var doms = document.getElementsByClassName("curPd");
      for (let index = 0; index < doms.length; index++) {
        const element = doms[index];
        element.classList.remove("loading");
      }
    }
  }, [quickView]);

  const bidWithPrice = () => {
    var price = $("#-Price").val();
    if (window.currentUser.Points < price) {
      alert("You have insufficient points to proceed");
      return false;
    }
    sendBid({ productId: quickBid.id, swapId: 0, exchange: 1, point: price });
  };

  const bidWithSwap = () => {
    var productId = 0;
    $(".mrkA").each(function(i, x) {
      productId = $(x).data("swap");
    });
    sendBid({ productId: quickBid.id, swapId: productId, exchange: 2 });
  };

  const sendBid = (payload) => {
    const url = "/product/Bid";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: payload,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      success: function(response) {
        changeQuickShopRoute("confirm");
        $.fn.kallesLoadQuikShop();
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  useEffect(() => {
    if (swaps != null) {
      $.fn.kallesLoadQuikShop();

      $(".qkShp").click(function() {
        $(this).toggleClass("mrkA");

        if ($(".mrkA").length > 0) {
          $("#-Price").val(0);
          $("#-Price").prop("disabled", true);
        } else {
          $("#-Price").prop("disabled", false);
        }
      });

      $("#proQkB").click(function() {
        var isPrice = $("#-Price").val() > 0;
        var isSwap = $(".mrkA").length > 0;
        if (!isSwap && !isPrice) {
          alert("Please select a bid method");
        } else {
          if (isPrice) {
            bidWithPrice();
          } else if (isSwap) {
            bidWithSwap();
          }
        }
      });
    }
  }, [swaps]);

  useEffect(() => {
    if (queryParams.hasOwnProperty("confirmed")) {
      setData((data) => ({
        ...data,
        openConfirmModal: queryParams.confirmed,
      }));
    }

    FetchTrending();
    window.executeQuickShopClose = function() {
      dispatch(setQuickBid(null));
      setData((data) => ({
        ...data,
        quickShopRoute: "home",
      }));
    };
  }, []);

  useEffect(() => {
    if (openConfirmModal) {
      $("#myModal").modal();
    }
  }, [openConfirmModal]);

  const FetchTrending = (e) => {
    const url = "/product/FetchProducts";
    const { pageNumber: pn, pageSize: ps } = trenPag;
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { pageNumber: pn, pageSize: ps, flag: "trending" },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        var products = response.results;
        var productPagination = {
          pageNumber: response.pageNumber + 1,
          pageSize: ps,
        };
        setData((data) => ({
          ...data,
          trending: products,
          trenPag: productPagination,
        }));

        dispatch(setHomeTrending({ trending: products, trenPag: productPagination }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const changeQuickShopRoute = (newRoute) => {
    const tmpRoute = newRoute;
    setData((data) => ({
      ...data,
      quickShopRoute: newRoute,
    }));
  };

  return (
    <>
      <div className="modal fade" tabIndex="-1" role="dialog" id="myModal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ color: "red" }}>
                Profile update!
              </h5>
            </div>
            <div className="modal-body">
              <p>
                Please update your profile <a href="/account/update-profile">here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Slider />
      <Features />
      <ProductList
        showTitle={true}
        data={trending}
        title={"TRENDING"}
        subTitle={"Top view in this week"}
      />
      <NewsLetter />
      <Search />
      {/* mask overlay */}
      <div className="mask-overlay ntpf t__0 r__0 l__0 b__0 op__0 pe_none"></div>
      {/* end mask overlay */}
      {quickView && <QuickView />}
      {quickBid && (
        <QuickShop route={quickShopRoute} changeRoute={changeQuickShopRoute} />
      )}
    </>
  );
};

export default Home;
