import React from "react";
import logo from "../assets/logo.png";
function Banner() {
  return (
    <div className="d-flex flex-column align-items-center pb-2 border-bottom border-primary text-center">
      <img src={logo} style={{ width: "150px" }} alt="" />
      <h5 className="fw-bold">Radio Frequency Identification</h5>
      <h4 className="text-primary">Ilocos Sur Polytechnic State College</h4>
    </div>
  );
}

export default Banner;
