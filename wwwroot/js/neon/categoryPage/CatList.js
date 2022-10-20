import React, { Component, useState, useEffect, useRef } from "react";
import { usePath, A } from "hookrouter";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";

const CatList = (props) => {
  const { categories } = useSelector((state) => state.dash);
  const {editCat, deleteCat} = props;
  
  useEffect(() => {
      if(categories.length > 0){
        $("#dataTable").DataTable();
      }
    
  }, [categories]);

  return (
    <>
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
              <th>Product Count</th>
              <th>Is SubCategory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Product Count</th>
              <th>Is SubCategory</th>
              <th>Actions</th>
            </tr>
          </tfoot>
          <tbody>
            {categories.map((x, i) => {
              return (
                <tr>
                  <td>{x.name}</td>
                  <td>{x.productCount}</td>
                  <td>{(x.parentCategory != null).toString()}</td>
                  <td>
                    <a
                      onClick={(e) => editCat(e, x)}
                      href="#"
                      className="btn btn-primary btn-circle"
                    >
                      <i className="far fa-edit"></i>
                    </a>
                    &nbsp;
                    <a
                      onClick={(e) => deleteCat(e, x)}
                      href="#"
                      className="btn btn-primary btn-circle"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CatList;
