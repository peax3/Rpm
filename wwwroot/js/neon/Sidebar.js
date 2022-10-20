import React, { Component, useState, useEffect, useRef } from "react";
import { usePath, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = (props) => {
  const { userCount, categoryCount } = useSelector((state) => state.dash);
  const cls =
    "list-group-item list-group-item-action list-group-item-light p-3";
  const path = usePath();
  const pathArr = path.split("/");
  const root = pathArr[2];
  const subPath = pathArr[3];


  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/neon"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <a className="nav-link" href="/neon">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Menu</div>

        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
            id="mem"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Members</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <A className={`collapse-item ${root == "members" ? "active":""}`} href="/neon/members" >
                All {`(${userCount})`}
              </A>
              <A className={`collapse-item ${root == "member-roles" ? "active":""}`} href="/neon/member-roles" >
                Member roles
              </A>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
            id="cat"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Categories</span>
          </a>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <A className={`collapse-item ${root == "categories" ? "active":""}`} href="/neon/categories" >
                All {`(${categoryCount})`}
              </A>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            data-toggle="collapse"
            data-target="#collapseFour"
            aria-expanded="true"
            aria-controls="collapseFour"
            id="dispatch"
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Dispatch</span>
          </a>
          <div
            id="collapseFour"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <A className={`collapse-item ${root == "dispatch" ? "active":""}`} href="/neon/dispatch" >
                All
              </A>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>

        <div className="sidebar-card d-none d-lg-flex">
          <img
            className="sidebar-card-illustration mb-2"
            src="img/undraw_rocket.svg"
            alt="..."
          />
          <p className="text-center mb-2">
            <strong>SB Admin Pro</strong> is packed with premium features,
            components, and more!
          </p>
          <a
            className="btn btn-success btn-sm"
            href="https://startbootstrap.com/theme/sb-admin-pro"
          >
            Upgrade to Pro!
          </a>
        </div>
      </ul>
    </>
  );
};

export default Sidebar;
