import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Admin from "./admin/Admin";
import Menu from "./core/Menu";
import Inventory from "./core/Inventory";
import AddProduct from "./admin/AddProduct";
import Product from "./core/Product";
import UpdateProduct from "./admin/UpdateProduct";
import Orders from "./core/Orders";
import Orderproduct from "./core/Orderproduct";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Admin} />
        <Route path="/inventory" exact component={Inventory} />
        <Route path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/order/:orderId" exact component={Orderproduct} />
        <Route path="/orders" exact component={Orders} />
        <Route
          path="/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
