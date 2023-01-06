import React from "react";
import "./Spinner.css";

const Spinner = () => (
  <div className="spinner-container">
    <div className="loader"></div>
  </div>
);

export const MiniSpinner = () => (
  <div className="mini-spinner-container">
  <div className="mini-loader"></div>
</div>
);

export const MediumSpinner = () => (
  <div className="medium-spinner-container">
  <div className="medium-loader"></div>
</div>
);

export default Spinner;
