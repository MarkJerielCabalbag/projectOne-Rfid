import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Tab from "../components/navigation/Tab";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEnvelope,
  faSearch,
  faTools,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import { faUber } from "@fortawesome/free-brands-svg-icons";
import Banner from "../components/Banner";
function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const dean = JSON.parse(localStorage.getItem("dean"));

  const navigate = useNavigate();

  //protect the dashboard by checking if it has a dean stored in the localStorage
  useEffect(() => {
    if (!dean) {
      navigate("/auth");
    }
  }, [navigate, dean]);

  return (
    <>
      {showModal && (
        <Modal
          modalTitle={"Account Info"}
          setShowModal={setShowModal}
          showModal={showModal}
          modalBody={
            <>
              <Banner />
              <p className="mt-4">
                {<FontAwesomeIcon icon={faUser} />}
                {""} {dean.firstname} {dean.lastname}
              </p>
              <p>
                {<FontAwesomeIcon icon={faEnvelope} />}
                {""} {dean.email}
              </p>
              <p>
                {<FontAwesomeIcon icon={faBuilding} />}
                {""} {dean.department}
              </p>
            </>
          }
        />
      )}
      <div className="container-fluid">
        <div className="container-sm container-md container-lg pt-3">
          <Banner />
          <div className="mt-4 d-flex justify-content-start gap-3">
            <p onClick={() => setShowModal(true)} className="text-primary">
              {<FontAwesomeIcon icon={faUserCircle} size={"2xl"} />} {""} Hi{" "}
              <b className="fst-italic text-primary">{dean.firstname}!</b>
            </p>
          </div>
          <Tab />
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
