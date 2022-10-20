import React, { Component, useState, useEffect, useRef } from "react";
import { checkIfProductIsNew, numberWithCommas } from "../../utils/Helpers";
const Products = (props) => {
  const { username } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    uploads: [],
    pag: { pageNumber: 0, pageSize: 10 },
    count: 0,
    filter: "user",
  });

  const { uploads, pag, count, filter } = data;

  

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const handleChange = (e) => {
    var fil = e.target.value;
    if (fil != filter) {
      setData((data) => ({
        ...data,
        filter: fil,
        pag: { pageNumber: 0, pageSize: 10 },
        uploads: [],
        count:0
      }));
    }
  };

  const fetchProducts = () => {
    const url = "/product/UserProducts";
    const { pageNumber, pageSize } = pag;
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      data: {
        pageNumber: pageNumber + 1,
        pageSize: pageSize,
        count: count,
        filter: filter,
        userId: window.currentUser.UserId
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        const { totalNumberOfItems, pageNumber, results } = response;
        setData((data) => ({
          ...data,
          count: totalNumberOfItems,
          uploads: [...uploads, ...results],
          pageNumber: pageNumber,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  return (
    <>
      <div style={{ marginTop: "21px", marginBottom: "-23px" }}>
        <form>
          <div class="form-group col-md-3" style={{ textAlign: "initial" }}>
            <label for="exampleFormControlSelect1">Filter by</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              name="filter"
              onChange={handleChange}
            >
              <option value="user">All</option>
              <option value="status">Active</option>
            </select>
          </div>
        </form>
      </div>
      <div className="kalles-section nt_section type_featured_collection tp_se_cdt">
        <div className="kalles-jewelry__tabs-section container">
          <div className="products nt_products_holder row fl_center row_pr_1 tc cdt_des_5 round_cd_true nt_cover ratio_nt position_8 space_30">
            {uploads.map((x, i) => {
              return (
                <div className="col-lg-3 col-md-3 col-6 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                  <div className="product-inner pr">
                    <div className="product-image pr oh lazyload">
                      {checkIfProductIsNew(x.created) && (
                        <span className="tc nt_labels pa pe_none cw">
                          <span className="nt_label new">New</span>
                        </span>
                      )}
                      <a className="db" href={`/product/${x.id}`}>
                        <div
                          className="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyload padding-top__100"
                          data-bgset="assets/images/home-jewelry/pr-15.jpg"
                        ></div>
                      </a>
                      <div className="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                        <div
                          className="pr_lazy_img back-img pa nt_bg_lz lazyload padding-top__100"
                          data-bgset="assets/images/home-jewelry/pr-16.jpg"
                        ></div>
                      </div>
                    </div>
                    <div className="product-info mt__15">
                      <h3 className="product-title pr fs__14 mg__0 fwm">
                        <a
                          className="cd chp"
                          href="product-detail-layout-01.html"
                        >
                          {x.name}
                        </a>
                      </h3>
                      <span className="price dib mb__5">
                        <span className="money">
                          ₦{numberWithCommas(x.price)}
                        </span>{" "}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
