import React, { useState, useEffect } from "react";
import Card from "./Card";
import { read } from "./apiCore";

const Product = (props) => {
  
  const [product, setProduct] = useState([]);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <div className="container">
      <div className="row mb-3 mt-3">
        {product && (
          <Card product={product} showViewProduct={false} details={true} />
        )}
      </div>
    </div>
  );
};

export default Product;
