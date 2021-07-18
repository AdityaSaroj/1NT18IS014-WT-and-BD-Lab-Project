import React, { useState, useEffect } from "react";
import { searchProduct, getOrders } from "./apiCore";
import Cardorder from "./Cardorder";

const Orders = () => {
  const [orgprods, setOrgprods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [run, setRun] = useState(false);

  useEffect(() => {
    getOrders().then((data) => {
      {
        console.log(data);
      }
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
        setOrgprods(data);
      }
    });
  }, [run]);
  const handlechange = (event) => {
    setSearchQuery(event.target.value);
    searchProduct(event.target.value).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        if (data.text) {
          console.log(orgprods);
          setOrders(orgprods);
        } else {
          setOrders(data);
        }
      }
    });
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Orders</h1>
      <p className="lead">These are the orders on First Impression.</p>
      <div className="col-12">
        <h4 className="mt-3">Orders</h4>

        <div className="boxContainer">
          <table className="elementsContainer">
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="search"
                  className="search"
                  onChange={(e) => handlechange(e)}
                  value={searchQuery}
                />
              </td>
              <td>
                <a href="/">
                  <i className="fa fa-search"></i>
                </a>
              </td>
            </tr>
          </table>
        </div>

        <div className="row mb-2 mt-4">
          {orders.map((order, i) => (
            <Cardorder key={i} product={order} setRun={setRun} run={run} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
