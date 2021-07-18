import React from "react";
import { Link } from "react-router-dom";

const MoodBoard = () => {
  return (
    <div className="container">
      <h1>Mood Boards</h1>
      <div className="moodboard">
        <h2>
          This feature will be available soon. Feel free to{" "}
          <Link to="/contact" className="contact-link">
            Contact Us
          </Link>
          .
        </h2>
        {/* <img
        src={`https://c.files.bbci.co.uk/EB24/production/_112669106_66030514-b1c2-4533-9230-272b8368e25f.jpg`}
        alt="Dog"
      /> */}
      </div>
    </div>
  );
};

export default MoodBoard;
