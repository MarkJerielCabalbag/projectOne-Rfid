import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import {
  faBuilding,
  faEnvelope,
  faRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dean = localStorage.getItem("dean");
  const handleLogout = () => {
    localStorage.removeItem("dean");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg  w-100 bg-primary">
      <div
        className="container-sm d-flex justify-content-between"
        style={{ width: "100%" }}
      >
        <div
          className="d-flex justify-content-between"
          style={{ width: "100vw" }}
        >
          <div>
            <a className="navbar-brand text-white" href="#">
              RFID
            </a>
          </div>
          <div>
            <button
              className="navbar-toggler bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
            >
              <span className="navbar-toggler-icon bg-white"></span>
            </button>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0 d-flex align-items-center justify-content-center gap-3">
            {dean ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/dashboard/home"
                    className="text-decoration-none text-light"
                  >
                    Dashboard
                  </Link>
                </li>
                <li
                  className="nav-item text-light d-flex align-items-center gap-2"
                  onClick={() => handleLogout()}
                >
                  Logout
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    style={{ color: "white" }}
                  />
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/auth" className="text-decoration-none text-light">
                  <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
