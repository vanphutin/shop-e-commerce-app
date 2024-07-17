import React from "react";
import video from "../assets/images/shop.gif";
import "../assets/styles/pages/_getStart.scss";

const GetStart = () => {
  return (
    <div className="home-page row">
      <div className="home-page__title col-12 col-md-6 ">
        <p className="title-head">Whatever you need, we are always ready!</p>
        <p className="title-body">
          Here, we always provide the best and newest products to you. Products
          are always updated and delivered to you quickly.
        </p>
        <button className="btn btn-outline-dark btn-lg">GET START</button>
      </div>
      <div className="home-page__video col-12 col-md-6 ">
        <img src={video} alt="shop" className="video-content" />
        <div className="video-overlay">
          <p className="overlay-text">
            Whatever you need, we are always ready!
          </p>
          <button className="btn btn-dark btn-lg overlay-btn">GET START</button>
        </div>
      </div>
    </div>
  );
};

export default GetStart;
