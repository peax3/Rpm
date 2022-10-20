import React, { Component, useState, useEffect, useRef } from "react";
import { usePath, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import { setUserCount, setUsers } from "../state/actions/dashAction";
const Roles = (props) => {
  const { userCount, users } = useSelector((state) => state.dash);
  const dispatch = useDispatch();
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    email: "",
    roles: [],
    user: null,
    allRoles: [],
    roleId: "",
  });

  const { email, roles, user, allRoles, roleId } = data;

  useEffect(() => {
    var elem = $("#mem").data("target");
    $(elem).collapse("toggle");
    getAllRoles();
  }, []);

  const getAllRoles = () => {
    const url = "/neon/roles";
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          allRoles: response,
          roleId: response[0].name,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const handleFormChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      email: e.target.value,
    }));
  };
  const updateForm = (e) => {
    e.preventDefault();
    const url = "/neon/GetUserRoles";
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { email: email },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          user: response,
          roles: response.roles,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const handleRoleChange = (e) => {
    e.persist();
    setData((data) => ({
      ...data,
      roleId: e.target.value,
    }));
  };

  const assignRole = (e) => {
    e.preventDefault();
    const url = "/account/AddUserToRole";
    $.ajax({
      type: "POST",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { userId: user.uid, roleId: roleId },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
    //   dataType: "json",
      success: function(response) {
        setData((data) => ({
          ...data,
          roles: [...roles, roleId],
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const deleteRole = (roleName)=>{
    const url = "/account/removerole";
    $.ajax({
      type: "DELETE",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      data: { userId: user.uid, roleId: roleName },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      "content-type": "application/json",
    //   dataType: "json",
      success: function(response) {
        setData((data) => ({
            ...data,
            roles: roles.filter((e)=>e != roleName),
          }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  }
  return (
    <>
      <Layout>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Members</h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4">
                <form method="post">
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="-PhoneNumber">User email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="-PhoneNumber"
                        onChange={handleFormChange}
                        value={email}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary col-md-4"
                    onClick={updateForm}
                  >
                    Fetch
                  </button>
                </form>
                {user && (
                  <>
                    <hr />
                    <form method="post">
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="-PhoneNumber">Assign roles</label>
                          <select
                            className="form-control"
                            name="condition"
                            onChange={handleRoleChange}
                          >
                            {allRoles.map((x, i) => {
                              return <option value={x.name}>{x.name}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary col-md-4"
                        onClick={assignRole}
                      >
                        Assign
                      </button>
                    </form>
                  </>
                )}
              </div>
              {user && (
                <div className="col-lg-3">
                  <div className="card-body">
                    <img
                      className="rounded"
                      src={user.picture}
                      style={{ height: "144px" }}
                    />
                    <h5 className="card-title">{user.name}</h5>
                  </div>
                </div>
              )}

              {user && (
                <div className="col-lg-4">
                    <h5 className="card-title">User Roles</h5>
                    <hr />
                    <ul class="nav">
                      {roles.map((x, i) => {
                        return (
                          <li class="nav-item" style={{width:"100%"}}>
                            <a class="nav-link active" href="#" style={{padding:0,display:"inline-block"}}>
                              ({i+1}) {x}
                            </a>
                            <span onClick={()=>deleteRole(x)} style={{float:"right", cursor:"pointer"}}><i className="fas fa-trash-alt"></i></span>
                          </li>
                        );
                      })}
                    </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Roles;
