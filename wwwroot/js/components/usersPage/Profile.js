import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "hookrouter";
import Reputation from "./Reputation";
import Products from "./Products";
import Favourite from "./Favourite";
import WhishList from "./WhishList"

const Profile = (props) => {
  const { username } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    stats: {
      total_bids: 0,
      total_favourites: 0,
      total_products: 0,
      total_swaps: 0,
      bookmarked: 0,
    },
    bookmarked:false
  });

  const { stats, bookmarked } = data;


  
  useEffect(() => {
    getProfileStats();
  }, []);


  const markUser=()=>{
    const url = "/users/MarkFavourite";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { userId: window.currentUser.UserId },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      //dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          bookmarked: !bookmarked,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  }

  const getProfileStats = (e) => {
    const url = "/profile/GetProfileStats";
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      data: { userId: window.currentUser.UserId },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          stats: response,
          bookmarked: response.bookmarked != 0
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };



  






  const { FirstName, LastName } = window.currentUser;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div class="card" style={{ width: "18rem" }}>
              <div className="card-body text-center cvhs">
                <img className="rounded" src="/img/prof.jpg" />
                <table
                  className="table table-borderless table-sm"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tbody>
                    <tr>
                      <td className="hosi">Username:</td>
                      <td>
                        <strong>{username}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="hosi">Name:</td>
                      <td>
                        <strong>{FirstName + " " + LastName}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="btn-info btn-sm btn-block"
                  onClick={markUser}
                  style={{ marginTop: 0 }}
                >
                  {bookmarked  ?  "UnFavourite": "Mark Favourite"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div class="card">
              <div className="card-body text-center cvhs">
                <nav>
                  <div
                    className="nav nav-tabs"
                    id="nav-tab"
                    role="tablist"
                    style={{ borderBottom: "none" }}
                  >
                    <a
                      className="nav-link active"
                      id="nav-home-tab"
                      data-toggle="tab"
                      href="#nav-home"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      Rep
                    </a>
                    <a
                      className="nav-link"
                      id="nav-profile-tab"
                      data-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Products
                    </a>
                    <a
                      className="nav-link"
                      id="nav-contact-tab"
                      data-toggle="tab"
                      href="#nav-contact"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      Reviews
                    </a>
                    <a
                      className="nav-link"
                      id="nav-favo-tab"
                      data-toggle="tab"
                      href="#nav-favo"
                      role="tab"
                      aria-controls="nav-favo"
                      aria-selected="false"
                    >
                      Favourites
                    </a>
                    <a
                      className="nav-link"
                      id="nav-whish-tab"
                      data-toggle="tab"
                      href="#whish-favo"
                      role="tab"
                      aria-controls="whish-favo"
                      aria-selected="false"
                    >
                      Whishlist
                    </a>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <Reputation stats={stats} />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <Products />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                   <p>HELLO WORL</p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-favo"
                    role="tabpanel"
                    aria-labelledby="nav-favo-tab"
                  >
                    <Favourite />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="whish-favo"
                    role="tabpanel"
                    aria-labelledby="nav-whish-tab"
                  >
                    <WhishList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
