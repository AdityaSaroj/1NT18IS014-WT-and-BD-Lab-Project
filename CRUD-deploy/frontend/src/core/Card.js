import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { deleteProduct } from "../admin/apiAdmin";

const Card = ({
  product,
  showViewProduct = true,
  details = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = (showViewProduct) => {
    return (
      showViewProduct && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const fullDetails = (details) => {
    return (
      details && (
        <div className="row">
          <div className="col-6">
            <p>
              <b>Description:</b> {product.description}
            </p>
            <p>
              <b>Section:</b> {product.section}
            </p>
            <p>
              <b>Brand:</b> {product.brand}
            </p>
            <p>
              <b>Material:</b> {product.material}
            </p>
            <p>
              <b>Color:</b> {product.color}
            </p>
            <p>
              <b>Design:</b> {product.design}
            </p>
          </div>
          <div className="col-6">
            <p>
              <b>Application:</b> {product.application}
            </p>
            <p>
              <b>Instruction:</b> {product.instruction}
            </p>

            <p>
              <b>Width:</b> {product.width}
            </p>
            <p>
              <b>Length:</b> {product.length}
            </p>
            <p>
              <b>Section:</b> {product.weight}
            </p>
            <p>
              <b>Repeat Length:</b> {product.repeatLength}
            </p>
            <p>
              <b>Roll Length:</b> {product.rollLength}
            </p>
            <p>
              <b>Property:</b> {product.property}
            </p>
            <p>
              <b>Style:</b>: {product.style}
            </p>
            <p>
              <b>Delivery Charges:</b> {product.delivery}
            </p>
            <p>
              <b>GST:</b> {product.gst}
            </p>
            <p>
              <b>Discount:</b> {product.discount}
            </p>
          </div>
        </div>
      )
    );
  };

  let cardClass;
  if (details) {
    cardClass = "col-8 mb-3";
  } else {
    cardClass = "col-4 mb-3";
  }

  const deleteItem = (productId) => {
    deleteProduct(productId, setRedirect(true));
    setRun(!run);
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/inventory" />;
    }
  };

  return (
    <div className={cardClass}>
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          {product.discount <= 0 ? (
            <p>&#8377;{product.price}</p>
          ) : (
            <p>
              <strike>&#8377; {product.price}</strike>&#8377;{" "}
              {product.price - (product.discount / 100) * product.price}
            </p>
          )}
          {fullDetails(details)}
          {showViewButton(showViewProduct)}
          <Link to={`/product/update/${product._id}`}>
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              Update Product
            </button>
          </Link>
          <button
            className="btn btn-outline-primary mt-2 mb-2 mr-2"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${product.name}?`
                )
              ) {
                deleteItem(product._id);
              }
            }}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
