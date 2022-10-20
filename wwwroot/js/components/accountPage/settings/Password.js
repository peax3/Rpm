import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";

const Password = (props) => {
  const dispatch = useDispatch();
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const { profile } = useSelector((state) => state.account);
  const [data, setData] = useState({
    password1: "",
    password2:"",
    disableSubmit: false,
  });

  const { password1,password2, disableSubmit } = data;

  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if(password1 != password2){
      alert("Both passwords do not match");
      return false;
    }
    const url = "/account/u_account_profile";
    var fd = new FormData();
    fd.append("PhoneNumber", window.currentUser.PhoneNumber);
    fd.append("part", "password");
    fd.append("FirstName", window.currentUser.FirstName);
    fd.append("LastName", window.currentUser.LastName);
    fd.append("DateOfBirth", window.currentUser.DateOfBirth);
    fd.append("stateId",  window.currentUser.StateId);
    fd.append("Address", password1);
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
        alert("Password updated successfully");
        window.location.href = "/account/login";
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };
  return (
    <>
      <div class="card-header">Change Password</div>
      <div className="card-body">
        <div className="col-md-8" style={{ margin: "auto" }}>
          <form method="post">
            <div asp-validation-summary="All" className="text-danger"></div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <input
                  type="text"
                  name="password1"
                  placeholder="New password"
                  className="form-control"
                  id="-password1"
                  onChange={handleFormChange}
                  value={password1}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <input
                  type="text"
                  name="password2"
                  placeholder="Re-type new password"
                  className="form-control"
                  id="-password2"
                  onChange={handleFormChange}
                  value={password2}
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
              Change
            </button>
            <small style={{color:"red"}}>*Passwords must be at least 6 characters.,
                Passwords must have at least one <br/>non 
                alphanumeric character.,
                Passwords must have at least one digit ('0'-'9').,
                <br/>Passwords must have at least one uppercase ('A'-'Z')</small>
          </form>
        </div>
      </div>
    </>
  );
};

export default Password;
