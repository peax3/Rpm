import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";

const Confirm = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  const [data, setData] = useState({
    phone: "",
    disableSubmit: true,
  });

  const { phone, disableSubmit } = data;

  const handleFormChange = () => {};

  const submitForm = () => {};

  return (
    <>
      <div class="card-header">Add phone number</div>
      <div className="card-body">
        <div className="col-md-8" style={{ margin: "auto" }}>
          <form method="post">
            <div asp-validation-summary="All" className="text-danger"></div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="-phone">Your email</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  id="-phone"
                  onChange={handleFormChange}
                  value={phone}
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
              Receive confirmation link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Confirm;
