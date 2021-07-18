import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { deleteOrder } from "./apiCore";

const Cardorder = ({
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
        <Link to={`/order/${product._id}`}>
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
              <b>Description:</b> {product.product[0].description}
            </p>
            <p>
              <b>Section:</b> {product.product[0].section}
            </p>
            <p>
              <b>Brand:</b> {product.product[0].brand}
            </p>
            <p>
              <b>Material:</b> {product.product[0].material}
            </p>
            <p>
              <b>Color:</b> {product.product[0].color}
            </p>
            <p>
              <b>Design:</b> {product.product[0].design}
            </p>
          </div>
          <div className="col-6">
            <p>
              <b>Application:</b> {product.product[0].application}
            </p>
            <p>
              <b>Instruction:</b> {product.product[0].instruction}
            </p>

            <p>
              <b>Width:</b> {product.product[0].width}
            </p>
            <p>
              <b>Length:</b> {product.product[0].length}
            </p>
            <p>
              <b>Section:</b> {product.product[0].weight}
            </p>
            <p>
              <b>Repeat Length:</b> {product.product[0].repeatLength}
            </p>
            <p>
              <b>Roll Length:</b> {product.product[0].rollLength}
            </p>
            <p>
              <b>Property:</b> {product.product[0].property}
            </p>
            <p>
              <b>Style:</b>: {product.product[0].style}
            </p>
            <p>
              <b>Delivery Charges:</b> {product.product[0].delivery}
            </p>
            <p>
              <b>GST:</b> {product.product[0].gst}
            </p>
            <p>
              <b>Mode of Payment:</b> {product.product[0].gst}
            </p>
            <p>
              <b>Delivery address:</b> {product.product[0].gst}
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

  const deleteItem = (orderId) => {
    deleteOrder(orderId, setRedirect(true));
    setRun(!run);
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/orders" />;
    }
  };

  return (
    <div className={cardClass}>
      <div className="card">
      
        <div className="card-header">{product.product[0].name}</div>
        <div className="card-body">
          {shouldRedirect(redirect)}
          <ShowImage item={product.product[0]} url="product" />
          <p>&#8377;{product.product[0].price}</p>
          {fullDetails(details)}
          {showViewButton(showViewProduct)}
          {/* <Link to={`/product/update/${product._id}`}>
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              Update Product
            </button>
          </Link> */}
          <button
            className="btn btn-outline-primary mt-2 mb-2 mr-2"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you delivered ${product.product[0].name}?`
                )
              ) {
                {console.log(product.product[0]._id)}
                deleteItem(product._id);
              }
            }}
          >
            Delivered
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cardorder;
