import React from "react";
import logo from "../assets/logo.png";
function Spinner({ spinnerMessage }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img src={logo} className="mb-3" />
      <h3>{spinnerMessage}</h3>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
