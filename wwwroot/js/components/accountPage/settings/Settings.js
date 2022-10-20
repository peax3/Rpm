import React, { Component, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Confirm from "./Confirm";
import Contact from "./Contact";
import Password from "./Password";
import Phone from "./Phone";
import { navigate } from "hookrouter";


const Settings = (props) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  const [data, setData] = useState({
    path: "contact",
  });

  const { path } = data;

  const showViews = () => {
    switch (path) {
      case "contact":
        return <Contact />;
      case "confirm":
        return <Confirm />;
      case "password":
        return <Password />;
      case "phone":
        return <Phone />;
      default:
        break;
    }
  };

  const navi = (e) => {
    e.persist();
    e.preventDefault();
    const route = e.target.getAttribute("data-id");
    setData((data) => ({
      ...data,
      path: route,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div class="card" style={{ width: "18rem" }}>
            
              <div class="card-header">
                <i class="las la-angle-left" style={{cursor:"pointer"}} onClick={()=> navigate("/account/")}></i>
                Settings
              </div>
              <ul class="list-group list-group-flush">
                <a
                  href="#"
                  onClick={navi}
                  data-id="contact"
                  class="list-group-item list-group-item-action"
                >
                  Personal details
                </a>
                <a
                  href="#"
                  onClick={navi}
                  data-id="phone"
                  class="list-group-item list-group-item-action"
                >
                  Add phone number
                </a>
                <a
                  href="#"
                  onClick={navi}
                  data-id="confirm"
                  class="list-group-item list-group-item-action"
                >
                  Confirm email
                </a>
                <a
                  href="#"
                  onClick={navi}
                  data-id="password"
                  class="list-group-item list-group-item-action"
                >
                  Change password
                </a>
                <a href="/account/logout" class="list-group-item list-group-item-action">
                  Log out
                </a>
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div class="card">{showViews()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
