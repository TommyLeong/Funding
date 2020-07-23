import React from "react";
import "./styles/Backdrop.css";

const Backdrop = (props) => {
  return <div className="backDrop" onClick={props.backdropClickHandler} />;
};

export default Backdrop;
