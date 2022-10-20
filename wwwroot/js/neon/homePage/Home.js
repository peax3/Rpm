import React, { Component, useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import {setUserCount, setUsers, setCategoryCount, setCategories} from "../state/actions/dashAction"

const Home = (props) => {
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();
  const dispatch = useDispatch();
  const { userCount, users, categoryCount } = useSelector((state) => state.dash);



  useEffect(() => {
    if (userCount == 0) {
      fetchUserSummary(0, 10, 1);
    }
    if(categoryCount == 0){
      fetchCategorySummary(0,10,1);
    }
  }, []);

  const fetchUserSummary = (usrCount, pageSize, page) => {
    const url = "/neon/GetMembersSummary";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { count: usrCount, pageSize: pageSize, page: page },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        const {totalNumberOfItems, results} = response;
        dispatch(setUserCount(totalNumberOfItems));
        dispatch(setUsers(results));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const fetchCategorySummary = (usrCount, pageSize, page) => {
    const url = "/neon/FetchCategories";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { count: usrCount, pageSize: pageSize, page: page },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        const {totalNumberOfItems, results} = response;
        dispatch(setCategoryCount(totalNumberOfItems));
        dispatch(setCategories(results));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };


  return (
    <>
      <Layout>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <a
            href="#"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Generate
            Report
          </a>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Members
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {userCount}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-users fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
