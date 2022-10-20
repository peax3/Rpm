import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const BulkHome = (props) => {
  const { setRoute, setBulk } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    title: "",
    discount: 0,
    description: "",
    files: [],
  });

  const {
    title,
    discount,
    description,
    files
  } = data;


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
    for (var i = 0; i < files.length; i++) {
      fd.append("file_" + i, files[i]);
    }
    fd.append("title", title);
    fd.append("discount", discount);
    fd.append("description", description);
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

  const getImages=(e)=>{
    var names = [];
    var filez = e.target.files;
    var file = filez[0];
    names.push(file);
    setData((data) => ({
      ...data,
      files: names,
    }));
  }

  return (
    <>
      <div className="container">
        <h3>Create bulk</h3>
        <div className="row">
          <div className="col-6">
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
              <div class="form-group">
                <label for="exampleFormControlFile1">Bundle Image Max(1)</label>
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  style={{padding:0, border:"none"}}
                  onChange={getImages}
                  accept="image/png, image/gif, image/jpeg"
                />
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

export default BulkHome;
