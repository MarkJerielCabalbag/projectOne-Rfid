import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import GetCard from "../content/RegisterCardsComponents/GetCard";
import HomeCard from "../components/placeholders/HomeCard";

function Home() {
  const dean = JSON.parse(localStorage.getItem("dean"));

  const navigate = useNavigate();

  //protect the dashboard by checking if it has a dean stored in the localStorage
  useEffect(() => {
    if (!dean) {
      navigate("/auth");
    }
  }, [navigate, dean]);

  return (
    <div className="container-sm container-md container-lg">
      <div>
        <GetCard
          className={"d-flex gap-3 overflow-x-scroll"}
          hideButtons={"invisible"}
          statusElement={<HomeCard />}
          width={{ width: "25rem" }}
        />
        <div className="fw-light mt-5 mb-5">
          <h1 className="border-bottom border-primary pb-3">
            Reason why we implemented RFID on classrooms....
          </h1>
          <p
            className="text-align-justify lh-lg"
            style={{ textAlign: "justify" }}
          >
            Implementing an RFID (Radio Frequency Identification) system in
            schools can significantly{" "}
            <b className="text-primary fst-italic fw-bold">
              enhance classroom security and optimize space utilization.
            </b>{" "}
            This technology{" "}
            <b className="text-primary fst-italic fw-bold">
              allows only authorized teachers to access specific rooms
            </b>
            , thereby preventing students from using these areas as hangout
            spots when they do not have a scheduled class. By embedding RFID
            tags in teacher ID cards and installing RFID readers at the
            entrances of classrooms and other sensitive areas,{" "}
            <b className="text-primary fst-italic fw-bold">
              the school can ensure that only designated staff can unlock and
              enter these rooms.
            </b>
            This not only helps in maintaining discipline but also ensures that
            school facilities are used appropriately,{" "}
            <b className="text-primary fst-italic fw-bold">
              {" "}
              fostering a more organized and secure learning environment.
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
