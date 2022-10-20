import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";

const Contact = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    FirstName: window.currentUser.FirstName,
    LastName: window.currentUser.LastName,
    PhoneNumber: window.currentUser.PhoneNumber,
    DateOfBirth: window.currentUser.DateOfBirth,
    Address: window.currentUser.Address,
    stateId: window.currentUser.StateId,
    provinceId: window.currentUser.ProvinceId,
    disableSubmit: true,
    provinces: [],
    states: [
      {
        name: "Lagos",
        id: 1,
        provinces: [
          {
            id: 1,
            name: "Ikeja",
          },
          {
            id: 2,
            name: "Detroit",
          },
        ],
      },
      {
        name: "Abuja",
        id: 2,
        provinces: [
          {
            id: 1,
            name: "Obama",
          },
          {
            id: 2,
            name: "Akure",
          },
        ],
      },
    ],
  });

  const {
    FirstName,
    LastName,
    PhoneNumber,
    DateOfBirth,
    Address,
    disableSubmit,
    states,
    stateId,
    provinceId,
    provinces,
  } = data;

  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const checkEmpty = (val) => {
    return val.length === 0;
  };

  useEffect(() => {
    var errors = [];
    if (checkEmpty(FirstName)) {
      errors.push("First Name is requires");
    }
    if (checkEmpty(LastName)) {
      errors.push("Last Name is requires");
    }
    if (checkEmpty(PhoneNumber)) {
      errors.push("Phone Number is required");
    }
    if (stateId == 0) {
      errors.push("Please select a state");
    }
    if (DateOfBirth == null) {
      errors.push("Please select your date of birth");
    } else {
      var age = moment().diff(moment(DateOfBirth, "YYYY-MM-DD"), "years");
      if (age < 18) {
        errors.push("you must be above 18 to use this service");
      }
    }

    if (errors.length > 0) {
      setData((data) => ({
        ...data,
        disableSubmit: true,
      }));
    } else {
      setData((data) => ({
        ...data,
        disableSubmit: false,
      }));
    }
    console.log(errors);
  }, [FirstName, LastName, DateOfBirth, Address, stateId, PhoneNumber]);

  useEffect(() => {
    if (DateOfBirth != null) {
      var age = moment().diff(moment(DateOfBirth, "YYYY-MM-DD"), "years");
      if (age < 18) {
        setData((data) => ({
          ...data,
          disableSubmit: false,
        }));
      }
    }
  }, [DateOfBirth]);

  useEffect(() => {
    if (stateId != 0) {
      console.log(stateId);
      var stateIndex = states.findIndex((c) => c.id == stateId);
      console.log(states[stateIndex]);
      var provinceList = states[stateIndex].provinces;
      setData((data) => ({
        ...data,
        provinces: [...provinceList],
      }));
    }
  }, [stateId]);

  const submitForm = (e) => {
    e.preventDefault();
    const url = "/account/u_account_profile";
    var fd = new FormData();
    fd.append("FirstName", FirstName);
    fd.append("LastName", LastName);
    fd.append("DateOfBirth", DateOfBirth);
    fd.append("stateId", stateId);
    fd.append("Address", Address);
    fd.append("PhoneNumber", PhoneNumber);
    fd.append("part", "contact");
    if (provinceId != 0) {
      fd.append("provinceId", provinceId);
    }
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
        alert("Profile updated successfully");
        setData((data) => ({
          ...data,
          disableSubmit: false,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };
  return (
    <>
      <div class="card-header">Personal Details</div>
      <div className="card-body">
        <div className="col-md-8" style={{ margin: "auto" }}>
          <form method="post">
            <div asp-validation-summary="All" className="text-danger"></div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="-FirstName">First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  className="form-control"
                  id="-FirstName"
                  onChange={handleFormChange}
                  value={FirstName}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="-LastName">Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  className="form-control"
                  id="-LastName"
                  onChange={handleFormChange}
                  value={LastName}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="-DateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  name="DateOfBirth"
                  className="form-control"
                  id="-DateOfBirth"
                  onChange={handleFormChange}
                  value={new Date(DateOfBirth).toISOString().substring(0, 10)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="-Address">Address</label>
                <input
                  type="text"
                  name="Address"
                  className="form-control"
                  id="-Address"
                  onChange={handleFormChange}
                  value={Address}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="address_country_ship_2">State</label>
                <select
                  id="address_country_ship_2"
                  name="stateId"
                  onChange={handleFormChange}
                >
                  <option value="0">---</option>
                  {states.map((x, i) => {
                    return <option value={x.id} selected={x.id==stateId}>{x.name}</option>;
                  })}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label for="address_country_ship_2">Province</label>
                <select
                  id="address_country_ship_2"
                  name="provinceId"
                  onChange={handleFormChange}
                >
                  <option value="0">---</option>
                  {provinces.map((x, i) => {
                    return <option value={x.id} selected={x.id==provinceId}>{x.name}</option>;
                  })}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
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

export default Contact;
