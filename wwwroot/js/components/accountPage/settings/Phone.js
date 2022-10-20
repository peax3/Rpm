import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";

const Phone = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const [data, setData] = useState({
    PhoneNumber:  window.currentUser.PhoneNumber,
    disableSubmit: false,
  });

  const { PhoneNumber, disableSubmit } = data;

  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if(PhoneNumber.length < 11){
      alert("Please enter a valid phone number");
      return false;
    }
    const url = "/account/u_account_profile";
    var fd = new FormData();
    fd.append("PhoneNumber", PhoneNumber);
    fd.append("part", "phone");
    fd.append("FirstName", window.currentUser.FirstName);
    fd.append("LastName", window.currentUser.LastName);
    fd.append("DateOfBirth", window.currentUser.DateOfBirth);
    fd.append("stateId",  window.currentUser.StateId);
    fd.append("Address", window.currentUser.Address);
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
        alert("Phone number updated successfully");
        setData((data) => ({
          ...data,
          disableSubmit: true,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  return (
    <>
      <div class="card-header">Add phone number</div>
      <div className="card-body">
        <div className="col-md-8" style={{ margin: "auto" }}>
          <form method="post">
            <div asp-validation-summary="All" className="text-danger"></div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="-PhoneNumber">First Name</label>
                <input
                  type="text"
                  name="PhoneNumber"
                  className="form-control"
                  id="-PhoneNumber"
                  onChange={handleFormChange}
                  value={PhoneNumber}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block col-md-8"
              disabled={disableSubmit}
              onClick={submitForm}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Phone;
