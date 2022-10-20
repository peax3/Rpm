import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BundleList, EditBundle } from "./Index";

const BundleForm = (props) => {
  const {bundle} = props;
  const dispatch = useDispatch();
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    discount: bundle.discount,
    title: bundle.title,
    description: bundle.description,
    media:null
  });

  const { discount, title, description, media } = data;

  useEffect(()=>{
      if(bundle.banner != null){
        setData((data)=>({
          ...data,
          media:JSON.parse(bundle.banner)
        }))
      }
  },[]);


  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };



  const submitForm = (e)=>{
    e.preventDefault();
    const url = "/product/Bulk";
    var fd = new FormData();
    fd.append("title", title);
    fd.append("discount", discount);
    fd.append("description", description);
    fd.append("id", bundle.id);
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
        setBulk(response, "hom");
      },
      failure: function(response) {
        console.log(response);
      },
    });
  }

  const uploadImage=(e)=>{
    var fd = new FormData();
    fd.append("bundleId", bundle.id);
    fd.append("file_", e.target.files[0]);
    const url = "/product/UpdateBanner";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: fd,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      contentType: false,
      processData: false,
      success: function(response) {
        var d = response;
        d.Url = d.url;
        setData((data)=>({
          ...data,
          media:d
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  }

  return (
    <>
      <div className="container">
        <h3>Update bulk</h3>
        <div className="row">
          <div className="col-6">
            <img src={`/${media == null ? "img/one.jpg" : media.Url}`} />
            <div class="form-group">
                <label for="exampleFormControlFile1">Change image</label>
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  style={{padding:0, border:"none"}}
                  onChange={uploadImage}
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
            <form method="post">
              <div asp-validation-summary="All" className="text-danger"></div>
              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="-name">Product Name</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="-name"
                    onChange={handleFormChange}
                    value={title}
                    required
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="-price">Discount</label>
                  <input
                    type="number"
                    name="discount"
                    className="form-control"
                    id="-price"
                    onChange={handleFormChange}
                    value={discount}
                    required
                  />
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
             
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitForm}
              >
                Submit
              </button>
            </form>
            <br /> <br />
          </div>
        </div>
      </div>
    </>
  );

};

export default BundleForm;
