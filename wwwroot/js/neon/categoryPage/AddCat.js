import React, { Component, useState, useEffect, useRef } from "react";
import { usePath, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";

const AddCat = (props) => {
    const {setRoute} = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    subName: "",
    parentCat: 0,
    categories:[]
  });

  const { catName,  parentCat, categories } = data;

  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    const url = "/neon/FetchAllCat";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        setData((data)=>({
            ...data,
            categories:response
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };



  const submitForm = (e) => {
    e.preventDefault();
    const url = "/neon/addcat";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { parentCat: parentCat, name:catName },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        setRoute("home");
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };



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
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="-parentCat">Fix average prices</label>
                <select
                  className="form-control"
                  name="parentCat"
                  onChange={handleFormChange}
                >
                  <option value={0}>Parent category</option>
                  {categories.map((x,i)=>{
                      return <option value={x.id}>{x.name}</option>
                  })}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary col-md-4"
              onClick={submitForm}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCat;
