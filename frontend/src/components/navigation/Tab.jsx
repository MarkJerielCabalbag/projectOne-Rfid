import React from "react";
import { Link } from "react-router-dom";

function Tab() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/dashboard/home"
          style={{ color: "#800000" }}
          className="nav-link"
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/dashboard/registered-card"
          style={{ color: "#800000" }}
          className="nav-link"
        >
          Registered Cards
        </Link>
      </li>
    </ul>
  );
}

export default Tab;
