import React from "react";

function ButtonSpinner({ buttonContent, className, onClick, btnClassname }) {
  return (
    <button className={btnClassname} type="button" onClick={onClick}>
      <span role="status">{buttonContent}</span>
      <span className={`${className}`} aria-hidden="true"></span>
    </button>
  );
}

export default ButtonSpinner;
