import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const AddProduct = (props) => {
  const {setRoute} = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    name: "",
    price: 0,
    points: 0,
    description: "",
    TargetAudience: -1,
    ProductCondition: -1,
    ExchangeType: 0,
    Quantity: 1,
    categories: [],
    states: [],
    diablePoints: false,
    disablePrice: false,
    CategoryId: -1,
    StateId: currentUser.StateId,
    swappable: false,
    files: [],
  });

  const {
    name,
    price,
    points,
    description,
    categories,
    states,
    disablePrice,
    disablePoints,
    ExchangeType,
    Quantity,
    TargetAudience,
    StateId,
    CategoryId,
    swappable,
    files,
  } = data;

  useEffect(() => {
    fetchCategories();
    FetchStates();
  }, []);


  
  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchCategories = () => {
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: "/product/FetchCategories",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      contentType: false,
      processData: false,
      data: { count: 2, paggeSize: 10, page: 1 },
      success: function(response) {
        setData((data) => ({
          ...data,
          categories: response,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const FetchStates = () => {
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: "/home/FetchStates",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      contentType: false,
      processData: false,
      success: function(response) {
        setData((data) => ({
          ...data,
          states: response,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const url = "/product/SubmitProduct";
    var fd = new FormData();
    for (var i = 0; i < files.length; i++) {
      fd.append("file_" + i, files[i]);
    }
    if(swappable){
      fd.append("swappable", true);
    }
    fd.append("name", name);
    fd.append("price", price);
    fd.append("points", points);
    fd.append("description", description);
    fd.append("TargetAudience", TargetAudience);
    fd.append("ExchangeType", ExchangeType);
    fd.append("CategoryId", CategoryId);
    fd.append("StateId", StateId);
    fd.append("Quantity", Quantity);
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      data: fd,
      contentType: false,
      processData: false,
      success: function(response) {
        window.location.href = "/product/" + response.id;
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const getImages=(e)=>{
    var names = [];
    var filez = e.target.files;
    //var uploadCount = 0;
    // if (filetype == "video") {
    //   uploadCount = 0;
    // } else if (filetype == "image") {
    //   uploadCount = 6;
    // }
    for (var i = 0; i <= filez.length - 1; i++) {
      var file = filez[i];
      if (file.type.match("image")) {
        if (i > 6) {
          break;
        }
        names.push(file);
      }
    }

    setData((data) => ({
      ...data,
      files: names,
    }));
  }

  const checkSwappable = (e) => {
    setData((data) => ({
      ...data,
      swappable: !swappable,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <form method="post">
              <div asp-validation-summary="All" className="text-danger"></div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="-name">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="-name"
                    onChange={handleFormChange}
                    value={name}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="-CategoryId">Category</label>
                  <select name="CategoryId" onChange={handleFormChange}>
                    <option value="-1">---</option>
                    {categories.map((x, i) => {
                      return <option value={x.id}>{x.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="-TargetAudience">Target Audience</label>
                  <select name="TargetAudience" onChange={handleFormChange}>
                    <option value="-1">---</option>
                    <option value="0">Men</option>
                    <option value="1">Women</option>
                    <option value="2">Unisex</option>
                    <option value="3">Boys</option>
                    <option value="4">Girls</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="-ProductCondition">Product Condition</label>
                  <select name="ProductCondition" onChange={handleFormChange}>
                    <option value="-1">---</option>
                    <option value="0">New</option>
                    <option value="1">Barely Touched</option>
                    <option value="2">Well Used</option>
                  </select>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label swapa" for="gridCheck1">
                    Swappable
                  </label>
                  <input
                    style={{ marginTop: "10px" }}
                    class="form-check-input"
                    type="checkbox"
                    name="swappable"
                    value={swappable}
                    onChange={checkSwappable}
                  />
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="-price">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    id="-price"
                    onChange={handleFormChange}
                    value={price}
                    required
                    disabled={disablePrice}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="-Quantity">Quantity</label>
                  <input
                    type="number"
                    name="Quantity"
                    className="form-control"
                    id="-Quantity"
                    onChange={handleFormChange}
                    value={Quantity}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="-StateId">Product Location</label>
                  <select name="StateId" onChange={handleFormChange}>
                    {states.map((x, i) => {
                      return (
                        <option value={x.id} selected={x.id == StateId}>
                          {x.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="-description">Description</label>
                  <textarea
                    rows={4}
                    type="text"
                    name="description"
                    className="form-control"
                    id="-description"
                    onChange={handleFormChange}
                    value={description}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlFile1">Product Images Max(7), Video Max(1)</label>
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  style={{padding:0, border:"none"}}
                  onChange={getImages}
                  multiple
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitForm}
              >
                Submit
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style = {{float:"right"}}
                onClick={()=>setRoute("bul")}
              >
                Bulk Upload
              </button>
            </form>
            <br/> <br/>
          </div>
          <div className="col">3 of 3</div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
