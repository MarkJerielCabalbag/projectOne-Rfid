import React from "react";

function RegisterCardPlaceholder() {
  return (
    <div>
      <div className="d-flex gap-2">
        <button className="btn placeholder bg-warning col-2 mt-4"></button>
        <button className="btn placeholder bg-primary col-5 mt-4"></button>
      </div>
      <div className="card my-2 w-100">
        <div className="card-body d-flex flex-column">
          <h2 className="placeholder col-6 placeholder-glow"></h2>
          <p className="placeholder col-4 placeholder-glow"></p>
          <span className="placeholder col-2 placeholder-glow"></span>
        </div>
        <div className="card-body d-flex flex-column gap-2">
          <button className="btn btn-secondary placeholder placeholder-glow w-100"></button>
          <button className="btn bg-danger placeholder placeholder-glow w-100"></button>
        </div>
      </div>
    </div>
  );
}

export default RegisterCardPlaceholder;
