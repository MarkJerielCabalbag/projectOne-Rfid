import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Authentication from "../pages/Authentication";

function AppLayout() {
  const navigate = useNavigate();

  const dean = localStorage.getItem("dean");
  useEffect(() => {
    if (!dean) navigate("/auth");
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="vh-100 mt-3">
        {dean ? <Outlet /> : <Authentication />}
      </div>
    </>
  );
}

export default AppLayout;
