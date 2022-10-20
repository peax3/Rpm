import React, { Component, useState, useEffect, useRef } from "react";
import { usePath, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";

const EditCat = (props) => {
  const { cat } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    catName: cat.name,
    subName: "",
    subs: [],
    prices: [],
    price: 0,
    condition: 0,
  });

  const { catName, subName, subs, prices, price, condition } = data;

  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchSubs();
    fetchPrices();
  }, []);

  useEffect(() => {
    if (subs.length > 0) {
      $("#dataTable").DataTable();
    }
  }, [subs]);


  useEffect(() => {
    if(prices.length > 0){
      var con  = prices.find((e)=> e.categoryId == cat.id);
      setData((data) => ({
        ...data,
        price: con.price,
      }));
    }
  }, [prices]);


  const editCat = (cat) => {
    setData((data) => ({
      ...data,
      updateCat: cat,
      path: "update",
    }));
  };

  const deleteCat = (cat) => {};
  const ViewCat = (cat) => {};

  const fetchSubs = () => {
    const url = "/neon/FetchSubCategories";
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { pid: cat.id },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          subs: response,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const fetchPrices = () => {
    const url = "/neon/FetchCategoryPrices";
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { pid: cat.id },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          prices: response,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const updateForm = (e) => {
    e.preventDefault();
    const url = "/neon/updatecat";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { id: cat.id, name: catName },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {},
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const url = "/neon/addsub";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { pid: cat.id, name: subName },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {},
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const handlePriceChange = (e) => {
    e.persist();
    console.log(e.target.value);
    if (prices.length == 0) {
      setData((data) => ({
        ...data,
        condition: e.target.value,
      }));
    } else {
      var p = prices.find((e) => e.Condition == e.target.value);
      var pr = price;
      if (p) {
        pr = p.price;
      }

      setData((data) => ({
        ...data,
        condition: e.target.value,
        price: pr,
      }));
    }
  };

  const setPrice = (e)=>{
    e.preventDefault();
    const url = "/neon/catprice";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { pid: cat.id, condition: condition, price:price },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {},
      failure: function(response) {
        console.log(response);
      },
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-4">
          <form method="post">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="-PhoneNumber">Category name</label>
                <input
                  type="text"
                  name="catName"
                  className="form-control"
                  id="-PhoneNumber"
                  onChange={handleFormChange}
                  value={catName}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary col-md-4"
              onClick={updateForm}
            >
              Update
            </button>
          </form>
          <hr />
          <form method="post">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="-PhoneNumber">Add sub category</label>
                <input
                  type="text"
                  name="subName"
                  className="form-control"
                  id="-PhoneNumber"
                  onChange={handleFormChange}
                  value={subName}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary col-md-4"
              onClick={submitForm}
            >
              Add
            </button>
          </form>
          <hr />
          <form method="post">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="-PhoneNumber">Fix average prices</label>
                <select
                  className="form-control"
                  name="condition"
                  onChange={handlePriceChange}
                >
                  <option value={0}>New</option>
                  <option value={1}>Barely Touched</option>
                  <option value={2}>Well Used</option>
                </select>
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="-PhoneNumber">Average price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  id="-PhoneNumber"
                  onChange={handleFormChange}
                  value={price}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary col-md-4"
              onClick={setPrice}
            >
              Add
            </button>
          </form>
        </div>
        <div className="col-lg-8">
          <p>Sub Categories</p>
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Product Count</th>
                  <th>Is SubCategory</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Product Count</th>
                  <th>Is SubCategory</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
              <tbody>
                {subs.map((x, i) => {
                  return (
                    <tr>
                      <td>{x.name}</td>
                      <td>{x.productCount}</td>
                      <td>{(x.parentCategory != null).toString()}</td>
                      <td>
                        <a
                          onClick={() => editCat(x)}
                          href="#"
                          className="btn btn-primary btn-circle"
                        >
                          <i className="far fa-edit"></i>
                        </a>
                        &nbsp;
                        <a
                          onClick={() => deleteCat(x)}
                          href="#"
                          className="btn btn-primary btn-circle"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCat;
