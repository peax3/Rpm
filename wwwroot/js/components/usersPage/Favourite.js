import React, { Component, useState, useEffect, useRef } from "react";
import { checkIfProductIsNew, numberWithCommas } from "../../utils/Helpers";



const Favourite = (props) => {
  const { username } = props;
  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    users: [],
    pag: { pageNumber: 0, pageSize: 10 },
    count: 0,
  });

  const { users, pag, count } = data;

  

  useEffect(() => {
    fetchFavourites();
  }, []);

  

  const fetchFavourites = () => {
    const url = "/users/FavUsers";
    const { pageNumber, pageSize } = pag;
    $.ajax({
      type: "GET",
      headers: {
        RequestVerificationToken: xrf,
      },
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("XSRF-TOKEN", xrf);
      },
      data: {
        pageNumber: pageNumber + 1,
        pageSize: pageSize,
        count: count,
        userId: window.currentUser.UserId
      },
      "content-type": "application/json",
      dataType: "json",
      success: function(response) {
        const { totalNumberOfItems, pageNumber, results } = response;
        setData((data) => ({
          ...data,
          count: totalNumberOfItems,
          users: [...users, ...results],
          pageNumber: pageNumber,
        }));
      },
      failure: function(response) {
        console.log(response);
      },
    });
  };

  const initTool=(e)=>{
    console.log("i ran")
    $(e.target).tooltip();
  }

  return (
    <>
      {
        users.map((x,i)=>{
          return <img
                  onMouseEnter={initTool} 
                  title={
                    `
                    <b>${x.firstName + ' ' + x.lastName}</b>
                    `
                  } 
                  data-html="true" 
                  data-placement="top" 
                  data-toggle="tooltip" 
                  class="rounded float-left" 
                  src={x.picture} style={{height:"65px", cursor:"pointer"}}></img>
        })
      }
    </>
  );
};

export default Favourite;
