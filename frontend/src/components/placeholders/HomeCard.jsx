import React from "react";

function HomeCard() {
  return (
    <div className="">
      <button className="btn placeholder bg-warning col-2 mt-4"></button>
      <div className="card my-2" style={{ width: "25rem", height: "10rem" }}>
        <div className="card-body">
          <div className="d-flex flex-column">
            <h2 className="placeholder placeholder-glow bg-dark col-7"></h2>
            <p className="placeholder col-4"></p>
            <span className="placeholder col-2 placeholder-sm"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
