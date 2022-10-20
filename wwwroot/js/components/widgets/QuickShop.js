import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import { Social, Quantity, Whish } from ".";
import { numberWithCommas } from "../../utils/Helpers";
import { setSwapProducts } from "../../state/actions/homeAction";

const HomeView = (props) => {
  const { quickBid } = useSelector((state) => state.home);
  const { changeRoute, disableBidButton } = props;
  const isOwner = currentUser.UserId == quickBid.userId;
  
  useEffect(() => {
    window.reactQuickBid = function() {
      if (!isOwner) {
        bidProduct();
      }
    };
  }, []);

  const bidProduct = () => {
    const qt = parseInt($("#qkshp").val());
    if (qt < 1) {
      alert("Quantity cant be zero(0)");
    } else {
      changeRoute("bid");
      //$.magnificPopup.close();
      $.fn.kallesLoadQuikShop();
      $("#-Price").change(function(e) {
        alert("The text has been changed.");
      });
    }
  };

  return (
    <div className="wrap_qs_pr buy_qs_false kalles-quick-shop">
      <div className="qs_imgs_i row al_center mb__30">
        <div className="col-auto cl_pr_img">
          <div className="pr oh qs_imgs_wrap">
            <div
              className="row equal_nt qs_imgs nt_slider nt_carousel_qs p-thumb_qs"
              data-flickity='{"fade":false,"cellSelector":".qs_img_i","cellAlign":"center","wrapAround":true,"autoPlay":false,"prevNextButtons":false,"adaptiveHeight":true,"imagesLoaded":false,"lazyload":0,"dragThreshold":0,"pageDots":false,"rightToLeft":false}'
            >
              <div
                className="col-12 js-sl-item qs_img_i nt_img_ratio lazyload nt_bg_lz"
                data-bgset="assets/images/quick_shop/p_qs_01.jpg"
              ></div>
            </div>
          </div>
        </div>
        <div className="col cl_pr_title tc">
          <h3 className="product-title pr fs__16 mg__0 fwm">
            <a className="cd chp" href="product-detail-layout-01.html">
              {quickBid.name}
            </a>
          </h3>
          <div id="price_qs">
            <span className="price ">
              <ins>₦{numberWithCommas(quickBid.price)}</ins>
            </span>
          </div>
        </div>
      </div>
      <div className="qs_info_i tc">
        <div className="qs_swatch">
          <div id="callBackVariant_qs" className="nt_green nt1_xs nt2_">
            <div
              id="cart-form_qs"
              className="nt_cart_form variations_form variations_form_qs"
            >
              <div className="variations_button in_flex column w__100">
                <div className="flex al_center column">
                  <Quantity count={quickBid.quantity} isOwner={isOwner} />
                  <button
                    type="submit"
                    className="simCuB button truncate w__100 order-4"
                    id="sibAQ"
                  >
                    <span className="txt_add ">Bid</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          href={`/product/${quickBid.id}`}
          className="btn fwsb detail_link dib mt__15"
        >
          View full details<i className="facl facl-right"></i>
        </a>
      </div>
    </div>
  );
};

const BidView = (props) => {
  const dispatch = useDispatch();
  const { quickBid, swaps } = useSelector((state) => state.home);
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const { swappable } = quickBid;

  const FetchSwap = (e) => {
    const url = "/product/GetProductsForSwap";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: {
        pageSize: 10,
        page: 1,
        point: quickBid.points,
        price: quickBid.price,
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        dispatch(setSwapProducts(response));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  useEffect(() => {
    FetchSwap();
  }, []);

  return (
    <>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        How would you like to bid
      </p>
      <label for="-Price" className="bidClsTy">
        Product price
      </label>
      <input
        type="number"
        name="price"
        class="form-control"
        id="-Price"
        value={quickBid.price}
        disabled={true}
      />
      <br />

      {swappable && (
        <>
          <p className="bidClsTy">Swap a product instead</p>
          {swaps == null ? (
            <p>fetching available products..</p>
          ) : (
            <div>
              {swaps.map((x, i) => {
                return (
                  <div
                    style={{ width: "72px", height: "101px" }}
                    className="qkShp"
                    data-swap={x.id}
                  >
                    <img
                      src="assets/images/home-jewelry/pr-15.jpg"
                      style={{ height: "50px" }}
                    ></img>
                    <br />
                    <p>{x.name}</p>
                    <p>Price:{x.price}</p> <p>Points:{x.points}</p>
                  </div>
                );
              })}
              {swaps.length == 0 && (
                <p>you currently have no available products for swap!</p>
              )}
              <button style={{ float: "right" }} id="proQkB">
                Process
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

const Confirm = (props) => {
  return <p>Order placed!</p>;
};

const QuickShop = (props) => {
  const { route, changeRoute } = props;
  const { quickBid } = useSelector((state) => state.home);
  const [data, setData] = useState({
    disableBidButton: true,
  });

  console.log(route);
  const { disableBidButton } = data;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  useEffect(() => {
    if (quickBid != null) {
      const isOwner = currentUser.UserId == quickBid.userId;
      setData((data) => ({
        ...data,
        disableBidButton: isOwner,
      }));
    }
  }, [quickBid]);

  const showView = () => {
    switch (route) {
      case "home":
        return (
          <HomeView
            disableBidButton={disableBidButton}
            changeRoute={changeRoute}
          />
        );
      case "bid":
        return <BidView />;

      case "confirm":
        return <Confirm />;
      default:
        break;
    }
  };

  return (
    <>
      {quickBid && (
        <div id="quick-shop-tpl" className="dn">
          {showView()}
        </div>
      )}
    </>
  );
};

export default QuickShop;
