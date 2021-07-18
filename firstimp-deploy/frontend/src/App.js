import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import Backdrop from "./components/Backdrop";
import Product from "./components/Product";
import Gallery from "./components/Gallery";
import MoodBoard from "./components/MoodBoard";
import SearchByColor from "./components/SearchByColor";
import SearchByImage from "./components/SearchByImage";
import Contact from "./components/Contact";

function App() {
  const [show, setShow] = useState(false);

  const sidenavHandler = () => {
    setShow((prevState) => ({ show: !prevState.show }));
  };

  const backdropHandler = () => {
    setShow(false);
  };

  const sidenavCloser = () => {
    setShow(false);
  };

  let backdrop;
  if (show) {
    backdrop = <Backdrop backdropHandler={backdropHandler} />;
  }

  return (
    <BrowserRouter>
      <TopNav sidenavHandler={sidenavHandler} />
      <SideNav show={show} sidenavCloser={sidenavCloser} />
      {backdrop}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/:productId" exact component={Product} />
        <Route
          path="/products/:section"
          exact
          render={(props) => (
            <Gallery key={props.match.params.section || "empty"} />
          )}
        />
        <Route path="/moodboard" exact component={MoodBoard} />
        <Route path="/searchbycolor" exact component={SearchByColor} />
        <Route path="/searchbyimage" exact component={SearchByImage} />
        <Route path="/contact" exact component={Contact} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
