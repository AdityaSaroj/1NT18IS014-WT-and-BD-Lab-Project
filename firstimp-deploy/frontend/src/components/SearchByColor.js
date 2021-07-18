import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { HuePicker } from "react-color";
const namer = require("color-namer");

const SearchByColor = () => {
  const [palette, setPalette] = useState([]);
  const [section, setSection] = useState("Fabric");

  const handleChange = (id, e) => {
    // console.log(e.target);
    let colors = [...palette];
    let name = namer(`${e.target.value}`).basic[0].name;
    colors[id] = name;
    setPalette(colors);
  };

  return (
    <div className="container">
      <h1>Search By Color</h1>
      ` <br />
      <br />`
      <div className="sbc">
        <label htmlFor="section">Choose a section </label>
        <select
          name="section"
          id="section"
          onChange={(e) => {
            setSection(e.target.value);
          }}
        >
          <option value="Fabric">Fabrics</option>
          <option value="Wallpaper">Wallpapers</option>
          <option value="Sheer">Sheers</option>
          <option value="Tassel">Tassels</option>
          <option value="Madeup">Made Ups</option>
        </select>

        <br />

        <p>
          Click the buttons below and choose between 2 to 5 colors to create
          your own palette
        </p>

        <br />
        <br />

        <div className="palette">
          <input
            type="color"
            id="color1"
            name="color1"
            onChange={(e) => handleChange(0, e)}
          />
          <input
            type="color"
            id="color2"
            name="color2"
            onChange={(e) => handleChange(1, e)}
          />
          <input
            type="color"
            id="color3"
            name="color3"
            onChange={(e) => handleChange(2, e)}
          />
          <input
            type="color"
            id="color4"
            name="color4"
            onChange={(e) => handleChange(3, e)}
          />
          <input
            type="color"
            id="color5"
            name="color5"
            onChange={(e) => handleChange(4, e)}
          />
        </div>
        <br />
        {palette.length >= 2 && (
          <Link
            to={{
              pathname: `/products/${section}`,
              palette: palette,
            }}
            className="search-by-btn"
          >
            Search
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchByColor;
