import React, { Component, useState, useEffect, useRef } from "react";
import { usePath, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import { setUserCount, setUsers } from "../state/actions/dashAction";
const Members = (props) => {
  const { userCount, users } = useSelector((state) => state.dash);
  const dispatch = useDispatch();
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  useEffect(() => {
    var elem = $("#mem").data("target");
    $(elem).collapse("toggle");
    if (users.length == 0) {
      fetchUserSummary(0, 10, 1);
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      $("#dataTable").DataTable();
    }
  }, [users]);

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
        const { totalNumberOfItems, results } = response;
        dispatch(setUserCount(totalNumberOfItems));
        dispatch(setUsers(results));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  return (
    <>
      <Layout>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Members</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th>Age</th>
                    <th>Points</th>
                    <th>Active</th>
                    <th>Id</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th>Age</th>
                    <th>Points</th>
                    <th>Active</th>
                    <th>Id</th>
                  </tr>
                </tfoot>
                <tbody>
                  {users.map((x, i) => {
                    return (
                      <tr>
                        <td>{x.name}</td>
                        <td>{x.state}</td>
                        <td>{x.birth}</td>
                        <td>{x.points}</td>
                        <td>{x.active}</td>
                        <th>{x.email}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Members;
