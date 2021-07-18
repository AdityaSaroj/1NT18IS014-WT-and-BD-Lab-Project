import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fff", fontWeight: "600" };
  } else {
    return { color: "#fff" };
  }
};

const Menu = ({ history }) => {
  return (
    <ul className="sidebar col-2">
      <header>First Impression</header>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Admin
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/inventory")}
          to="/inventory"
        >
          Inventory
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/orders")}
          to="/orders"
        >
          Orders
        </Link>
      </li>
    </ul>
  );
};

export default withRouter(Menu);
