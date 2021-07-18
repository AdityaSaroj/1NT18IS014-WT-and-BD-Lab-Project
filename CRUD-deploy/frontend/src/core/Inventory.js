import React, { useState, useEffect } from "react";
import { getProducts, searchProduct } from "./apiCore";
import Card from "./Card";

const Inventory = () => {
  const [orgprods, setOrgprods] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [run, setRun] = useState(false);

  useEffect(() => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
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
          setProducts(orgprods);
        } else {
          setProducts(data);
        }
      }
    });
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Inventory</h1>
      <p className="lead">
        These are the products available on First Impression.
      </p>
      <div className="col-12">
        <h4 className="mt-3">Products</h4>

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
          {products.map((product, i) => (
            <Card key={i} product={product} setRun={setRun} run={run} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
