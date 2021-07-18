import React, { useEffect, useState } from "react";
import { getFilterValues } from "../api/apiCore";
const toHex = require("colornames");
const namer = require("color-namer");

const ColorBar = ({ color, onColorChange }) => {
  // eslint-disable-next-line
  const [colors, setColors] = useState([]);
  // const [selectedColor, setSelectedColor] = useState(color);

  const loadColors = () => {
    getFilterValues().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setColors(data.color);
      }
    });
  };

  useEffect(() => {
    loadColors();
  }, []);

  const rgbToHex = (color) => {
    color = "" + color;
    if (!color || color.indexOf("rgb") < 0) {
      return;
    }

    if (color.charAt(0) === "#") {
      return color;
    }

    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
      r = parseInt(nums[2], 10).toString(16),
      g = parseInt(nums[3], 10).toString(16),
      b = parseInt(nums[4], 10).toString(16);

    return (
      "#" +
      ((r.length === 1 ? "0" + r : r) +
        (g.length === 1 ? "0" + g : g) +
        (b.length === 1 ? "0" + b : b))
    );
  };

  const handleClick = (e) => {
    let selected = e.target.style.backgroundColor;
    let hex = rgbToHex(selected);
    const result = namer(`${hex}`).basic[0].name;
    // setSelectedColor(result);
    onColorChange(result);
    // console.log(result);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <div className="colorbar">
        {colors.map((c, i) => {
          let bg = toHex(c.trim());
          return (
            bg && (
              <li
                key={i}
                style={{ backgroundColor: bg }}
                className="colorbar-item"
                onClick={(e) => handleClick(e)}
              ></li>
            )
          );
        })}
      </div>
      {color && (
        <>
          <br />
          <label className="color-label">
            {capitalizeFirstLetter(color)}
            <button
              className="color-btn"
              onClick={() => {
                onColorChange("");
              }}
            >
              X
            </button>
          </label>
        </>
      )}
    </div>
  );
};

export default ColorBar;
