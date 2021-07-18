import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container">
      <h1 className="mt-4 mb-2">Admin Dashboard</h1>
      <p className="lead">
        Welcome admin, you can manage the First Impression website here.
      </p>
      <div className="row">
        <div className="col-4">
          <h5 className="mt-5">Important Links</h5>
          <Link
            to="/create/product"
            className="nav-link"
            style={{ color: "#fc0fc0" }}
          >
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
