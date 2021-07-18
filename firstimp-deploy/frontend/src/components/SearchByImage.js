import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePalette } from "react-palette";
const namer = require("color-namer");

const SearchByImage = () => {
  const [section, setSection] = useState("Fabric");
  const [image, setImage] = useState(
    "https://via.placeholder.com/300x300.png/dddddd/000000/?text=Your+Image+Here"
  );
  const [palette, setPalette] = useState([]);

  const { data } = usePalette(image);

  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    // console.log(e.target.value);
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(
        "https://via.placeholder.com/300x300.png/dddddd/000000/?text=Your+Image+Here"
      );
    }
  };

  useEffect(() => {
    let colors = Object.values(data);
    colors.forEach((c, i, colors) => {
      colors[i] = namer(`${colors[i]}`).basic[0].name;
    });
    console.log(colors);
    setPalette(colors);
  }, [data]);

  return (
    <div className="container">
      <h1>Search By Image</h1>
      <div className="sbi">
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
          Click on the Upload Image button to search for colors from an image
        </p>
        <br />
        {image && <img src={image} alt="uploaded" className="uploaded-image" />}
        <br />
        <input
          type="file"
          onChange={(e) => handleChange(e)}
          name="image-upload"
          id="image-upload"
          accept="image/*"
        />
        <label className="image-upload-label" htmlFor="image-upload">
          Upload Image
        </label>
        {data.vibrant && (
          <ul className="palette-list">
            <li
              className="palette-list-item"
              style={{ backgroundColor: data.vibrant }}
            ></li>
            <li
              className="palette-list-item"
              style={{ backgroundColor: data.muted }}
            ></li>
            <li
              className="palette-list-item"
              style={{ backgroundColor: data.lightVibrant }}
            ></li>
            <li
              className="palette-list-item"
              style={{ backgroundColor: data.lightMuted }}
            ></li>
            <li
              className="palette-list-item"
              style={{ backgroundColor: data.darkVibrant }}
            ></li>
            <li
              className="palette-list-item"
              style={{ backgroundColor: data.darkMuted }}
            ></li>
          </ul>
        )}
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

export default SearchByImage;
