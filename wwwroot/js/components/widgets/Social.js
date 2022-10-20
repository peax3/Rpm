import React, { Component, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Social = (props) => {
  return (
    <>
      <div className="social-share tc">
        <div className="at-share-btn-elements kalles-social-media d-block text-left fs__0 lh__1">
          <a
            href="https://www.facebook.com/"
            className="at-icon-wrapper at-share-btn at-svc-facebook bg-white kalles-social-media__btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="at-icon at-icon-facebook"
            >
              <g>
                <path
                  d="M22 5.16c-.406-.054-1.806-.16-3.43-.16-3.4 0-5.733 1.825-5.733 5.17v2.882H9v3.913h3.837V27h4.604V16.965h3.823l.587-3.913h-4.41v-2.5c0-1.123.347-1.903 2.198-1.903H22V5.16z"
                  fillRule="evenodd"
                ></path>
              </g>
            </svg>
          </a>
          <a
            href="https://twitter.com/"
            className="at-icon-wrapper at-share-btn at-svc-twitter bg-white kalles-social-media__btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="at-icon at-icon-twitter"
            >
              <g>
                <path
                  d="M27.996 10.116c-.81.36-1.68.602-2.592.71a4.526 4.526 0 0 0 1.984-2.496 9.037 9.037 0 0 1-2.866 1.095 4.513 4.513 0 0 0-7.69 4.116 12.81 12.81 0 0 1-9.3-4.715 4.49 4.49 0 0 0-.612 2.27 4.51 4.51 0 0 0 2.008 3.755 4.495 4.495 0 0 1-2.044-.564v.057a4.515 4.515 0 0 0 3.62 4.425 4.52 4.52 0 0 1-2.04.077 4.517 4.517 0 0 0 4.217 3.134 9.055 9.055 0 0 1-5.604 1.93A9.18 9.18 0 0 1 6 23.85a12.773 12.773 0 0 0 6.918 2.027c8.3 0 12.84-6.876 12.84-12.84 0-.195-.005-.39-.014-.583a9.172 9.172 0 0 0 2.252-2.336"
                  fillRule="evenodd"
                ></path>
              </g>
            </svg>
          </a>
          <a
            href="https://www.google.com/gmail/about"
            className="at-icon-wrapper at-share-btn at-svc-email bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="at-icon at-icon-email kalles-social-media__btn"
            >
              <g>
                <g fillRule="evenodd"></g>
                <path d="M27 22.757c0 1.24-.988 2.243-2.19 2.243H7.19C5.98 25 5 23.994 5 22.757V13.67c0-.556.39-.773.855-.496l8.78 5.238c.782.467 1.95.467 2.73 0l8.78-5.238c.472-.28.855-.063.855.495v9.087z"></path>
                <path d="M27 9.243C27 8.006 26.02 7 24.81 7H7.19C5.988 7 5 8.004 5 9.243v.465c0 .554.385 1.232.857 1.514l9.61 5.733c.267.16.8.16 1.067 0l9.61-5.733c.473-.283.856-.96.856-1.514v-.465z"></path>
              </g>
            </svg>
          </a>
          <a
            href="https://www.messenger.com"
            className="at-icon-wrapper at-share-btn at-svc-messenger bg-white kalles-social-media__btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="at-icon at-icon-messenger"
            >
              <g>
                <path
                  d="M16 6C9.925 6 5 10.56 5 16.185c0 3.205 1.6 6.065 4.1 7.932V28l3.745-2.056c1 .277 2.058.426 3.155.426 6.075 0 11-4.56 11-10.185C27 10.56 22.075 6 16 6zm1.093 13.716l-2.8-2.988-5.467 2.988 6.013-6.383 2.868 2.988 5.398-2.987-6.013 6.383z"
                  fillRule="evenodd"
                ></path>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default Social;
