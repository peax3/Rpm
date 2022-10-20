import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Account = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    DateOfBirth: null,
    Address: "",
    stateId: 0,
    provinceId: 0,
    disableSubmit: true,
    provinces: [],
    states: [],
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

  useEffect(()=>{
    FetchStates();
  }, [])

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

  const validateForm =()=>{
    var errors = [];
    if (checkEmpty(FirstName)) {
      errors.push("First Name is required");
    }
    if (checkEmpty(LastName)) {
      errors.push("Last Name is required");
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

    return errors;
  }

  useEffect(() => {
    var errors = validateForm();

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
      var curSt = states[stateIndex];
      if(curSt.allowed == false){
        alert("We are not fully operational in this state!");
      }
      var provinceList = states[stateIndex].provinces;
      setData((data) => ({
        ...data,
        provinces: [...provinceList],
      }));
    }
  }, [stateId]);

  const submitForm = (e) => {
    var errors = validateForm();
    if(errors.length > 0){
      var msg = "";
      for (const m of errors) {
        msg += m + "\n";
      }
      alert(msg);
      return false;
    }
    e.preventDefault();
    const url = "/account/update_profile";
    var fd = new FormData();
    fd.append("FirstName", FirstName);
    fd.append("LastName", LastName);
    fd.append("DateOfBirth", DateOfBirth);
    fd.append("stateId", stateId);
    fd.append("Address", Address);
    fd.append("PhoneNumber", PhoneNumber);
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
        alert("Profile update success");
        window.location.href = "/";
        console.log(response);
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };
  return (
    <>
      <section id="cover" className="min-vh-100">
        <div id="cover-caption">
          <div className="container">
            <div className="row text-white">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                <h1 className="display-4 py-2">Update profile</h1>
                <div className="px-2">
                  <form method="post">
                    <div
                      asp-validation-summary="All"
                      className="text-danger"
                    ></div>
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
                        <label htmlFor="-PhoneNumber">Phone Number</label>
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
                      <div className="form-group col-md-6">
                        <label htmlFor="-DateOfBirth">Date of Birth</label>
                        <input
                          type="date"
                          name="DateOfBirth"
                          className="form-control"
                          id="-DateOfBirth"
                          onChange={handleFormChange}
                          value={DateOfBirth}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
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
                            return <option value={x.id}>{x.name}</option>;
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
                            return <option value={x.id}>{x.name}</option>;
                          })}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={disableSubmit}
                      onClick={submitForm}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
