import React, { useState, useEffect } from "react";
import Cardorder from "./Cardorder";
import { readorder } from "./apiCore";

const Orderproduct = (props) => {
  
  const [order, setOrder] = useState([]);

  const loadSingleProduct = (orderId) => {
    readorder(orderId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        {console.log(data)}
        setOrder(data);
      }
    });
  };

  useEffect(() => {
    const orderId = props.match.params.orderId;
    {console.log(props.match.params.orderId)}
    loadSingleProduct(orderId);
  }, [props]);

  return (
    <div className="container">
      <div className="row mb-3 mt-3">
        
        {order && (
          <Cardorder product={order} showViewProduct={false} details={true} />
        )}
      </div>
    </div>
  );
};

export default Orderproduct;
