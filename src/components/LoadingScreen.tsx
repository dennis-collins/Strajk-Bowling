import React from "react";
import logo from "../assets/logo.svg";

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-overlay">
      <img src={logo} alt="Strajk Bowling logo" className="loading-logo" />
      <div className="loading-text">
        <span className="loading-title-main">STRAJK</span>
        <span className="loading-title-sub">BOWLING</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
