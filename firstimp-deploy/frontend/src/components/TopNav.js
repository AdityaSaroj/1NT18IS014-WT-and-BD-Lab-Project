import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AiOutlineFileImage,
  // AiOutlineSearch,
  AiOutlineMenu,
} from "react-icons/ai";
import { VscSymbolColor } from "react-icons/vsc";
import logo from "../assets/images/firstimp.png";

const TopNav = ({ sidenavHandler }) => {
  const navclass = () => {
    if (window.location.pathname === "/") {
      return "topnav";
    } else {
      return "topnav solid";
    }
  };

  const homelink = () => {
    if (window.location.pathname !== "/") {
      return (
        <Link to="/" className="toplogo2">
          <img src={logo} alt="logo" height="40" width="40" />
          <span className="toplogospan2">First Impression</span>
        </Link>
      );
    }
  };

  return (
    <ul className={navclass()}>
      <Link to="/" className="toplogo">
        <img src={logo} alt="logo" height="40" width="40" />
        <span className="toplogospan">First Impression</span>
      </Link>
      {homelink()}
      <ul className="menu">
        <li className="topnav-item">
          {/* className="topnav-item dropdown" for dropdown */}
          <Link className="nav-link" to="/products/Fabric">
            Fabrics
          </Link>
          {/* <span className="dropdown-content">
            <Link className="droplink" to="/">
              Link 1
            </Link>
            <Link className="droplink" to="/">
              Link 2
            </Link>
            <Link className="droplink" to="/">
              Link 3
            </Link>
            <Link className="droplink" to="/">
              Link 4
            </Link>
            <Link className="droplink" to="/">
              Link 5
            </Link>
            <Link className="droplink" to="/">
              Link 6
            </Link>
          </span> */}
        </li>
        <li className="topnav-item">
          <Link className="nav-link" to="/products/Wallpaper">
            Wallpapers
          </Link>
          {/* <span className="dropdown-content">
            <Link className="droplink" to="/">
              Link 1
            </Link>
            <Link className="droplink" to="/">
              Link 2
            </Link>
            <Link className="droplink" to="/">
              Link 3
            </Link>
            <Link className="droplink" to="/">
              Link 4
            </Link>
            <Link className="droplink" to="/">
              Link 5
            </Link>
            <Link className="droplink" to="/">
              Link 6
            </Link>
          </span> */}
        </li>
        <li className="topnav-item">
          <Link className="nav-link" to="/products/Sheer">
            Sheers
          </Link>
        </li>
        <li className="topnav-item">
          <Link className="nav-link" to="/products/Tassle">
            Tassels
          </Link>
        </li>
        <li className="topnav-item">
          <Link className="nav-link" to="/products/Madeup">
            Made Ups
          </Link>
        </li>

        {/* <li className="topnav-item searchbar">
          <form>
            <input
              type="text"
              placeholder="Search"
              name="search"
              className="search"
            />
            <button className="nav-link icon button">
              <AiOutlineSearch />
            </button>
          </form>
        </li> */}
        <li className="topnav-item">
          <Link className="nav-link icon" to="/searchbyimage">
            <AiOutlineFileImage title="Search By Image" />
          </Link>
        </li>
        <li className="topnav-item">
          <Link className="nav-link icon" to="/searchbycolor">
            <VscSymbolColor title="Search By Color" />
          </Link>
        </li>
        {/* <li className="topnav-item ls-btns">
          <button className="nav-btn login" to="/products/login">
            Log In
          </button>
        </li>
        <li className="topnav-item ls-btns">
          <button className="nav-btn signup" to="/products/signup">
            Sign Up
          </button>
        </li> */}
      </ul>
      <div className="toggler">
        <li className="toggler-btn">
          <span className="menu-btn">
            <AiOutlineMenu onClick={sidenavHandler} />
          </span>
        </li>
      </div>
    </ul>
  );
};

export default withRouter(TopNav);
