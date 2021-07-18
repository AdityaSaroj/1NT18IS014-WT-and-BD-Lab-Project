import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const SideNav = ({ show, sidenavCloser }) => {
  let classes = "sidenav";
  if (show) {
    classes = "sidenav open";
  }
  return (
    <nav className={classes}>
      <div className="sidenav-close">
        <AiOutlineClose className="close-btn" onClick={sidenavCloser} />
      </div>
      <ul>
        {/* <li className="sidenav-link sidenav-btns">
          <button className="nav-btn login" to="/products/login">
            Log In
          </button>
        </li>
        <li className="sidenav-link sidenav-btns">
          <button className="nav-btn signup" to="/products/signup">
            Sign Up
          </button>
        </li> */}
        <br />
        <li>
          <Link to="/products/Fabric" className="sidenav-link">
            Fabrics
          </Link>
        </li>
        <li>
          <Link to="/products/Wallpaper" className="sidenav-link">
            Wallpapers
          </Link>
        </li>
        <li>
          <Link to="/products/Sheer" className="sidenav-link">
            Sheers
          </Link>
        </li>
        <li>
          <Link to="/products/Tassle" className="sidenav-link">
            Tassels
          </Link>
        </li>
        <li>
          <Link to="/products/Madeup" className="sidenav-link">
            Made Ups
          </Link>
        </li>
        <li>
          <Link to="/searchbyimage" className="sidenav-link">
            Search By Image
          </Link>
        </li>
        <li>
          <Link to="/searchbycolor" className="sidenav-link">
            Search By Color
          </Link>
        </li>
        {/* <li>
          <Link to="/" className="sidenav-link">
            Fabric Estimator
          </Link>
        </li> */}
        <li>
          <Link to="/moodboard" className="sidenav-link">
            Mood Boards
          </Link>
        </li>
        <li>
          <Link to="/contact" className="sidenav-link">
            Contact
          </Link>
        </li>
        <span className="social">
          <a href="/">
            <FaFacebook className="social-icon" />
          </a>
          <a href="/">
            <FaInstagram className="social-icon" />
          </a>
          {/* <a href="/">
            <FaTwitter className="social-icon" />
          </a> */}
        </span>
      </ul>
    </nav>
  );
};

export default SideNav;
