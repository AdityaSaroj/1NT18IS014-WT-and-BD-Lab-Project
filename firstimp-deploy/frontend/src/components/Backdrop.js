import React from "react";

const Backdrop = ({ backdropHandler }) => {
  return <div className="backdrop" onClick={backdropHandler} />;
};

export default Backdrop;
