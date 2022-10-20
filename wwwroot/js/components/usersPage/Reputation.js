import React, { Component, useState, useEffect, useRef } from "react";

const Reputation = (props) => {
  const { username, stats: stato } = props;

  const xrf = $('input:hidden[name="__RequestVerificationToken"]').val();

  const [data, setData] = useState({
    stats: stato,
  });

  useEffect(() => {
    setData((data) => ({
      ...data,
      stats: props.stats
    }));
  }, [props.stats]);

  const { stats } = data;
  const { total_bids, total_favourites, total_products, total_swaps } = stats;

  const { FirstName, LastName } = window.currentUser;

  return (
    <>
      <div className="repGrd">
        <hr />
        <table
          className="table table-borderless table-sm"
          style={{ margin: "auto" }}
        >
          <tbody>
            <tr>
              <td>
                <strong>{total_products} Products</strong>
              </td>
              <td>
                <strong>{total_bids} Bids</strong>
              </td>
              <td>
                <strong>{total_swaps} Swaps</strong>
              </td>
              <td>
                <strong>{total_favourites} Favourites</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
    </>
  );
};

export default Reputation;
