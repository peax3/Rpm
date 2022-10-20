import React, { Component, useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
const Layout = (props) => {
  const { children} = props;
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Nav />
          <div className="container-fluid">
            {children}
          </div>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2021</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
