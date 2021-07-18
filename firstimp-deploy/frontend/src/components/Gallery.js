import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  BsSquareFill,
  BsFillGridFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { getProductsBySection } from "../api/apiCore";
//import ShowImage from "./ShowImage";
// import MyPicker from "./MyPicker";
import ColorBar from "./ColorBar";
import Checkboxes from "./Checkboxes";
const ShowImage = lazy(() => import("./ShowImage"));

const Gallery = () => {
  const { section } = useParams();
  const { palette } = useLocation();

  const [gridClass, setGridClass] = useState("gallery-grid grid-4");
  const [products, setProducts] = useState([]);
  // const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterArrow, setFilterArrow] = useState(9662);
  const [selectedFilters, setSelectedFilters] = useState({
    color: "",
    colorArray: palette,
    brand: [],
    design: [],
    material: [],
    application: [],
    property: [],
    price: [0, 9999999],
  });

  const {
    color,
    colorArray,
    brand,
    design,
    material,
    application,
    //property,
  } = selectedFilters;

  const onColorChange = (color) => {
    setSelectedFilters({ ...selectedFilters, color: color });
    // console.log(color);
  };

  const onBrandChange = (brand) => {
    setSelectedFilters({ ...selectedFilters, brand: brand });
    // console.log(brand);
  };

  const onDesignChange = (design) => {
    setSelectedFilters({ ...selectedFilters, design: design });
    // console.log(design);
  };

  const onMaterialChange = (material) => {
    setSelectedFilters({ ...selectedFilters, material: material });
    // console.log(material);
  };

  const onApplicationChange = (application) => {
    setSelectedFilters({ ...selectedFilters, application: application });
    // console.log(application);
  };

  // const onPropertyChange = (property) => {
  //   setSelectedFilters({ ...selectedFilters, property: property });
  //   // console.log(property);
  // };

  const onPriceChange = (e) => {
    let range = e.target.value;
    let nums = range.split(" ").map((x) => +x);
    if (e.target.checked) {
      setSelectedFilters({ ...selectedFilters, price: nums });
      // console.log(e.target.value);
    }
    // setSelectedFilters({ ...selectedFilters, price: price });
  };

  const handleGrid = (gridClass) => {
    setGridClass(gridClass);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadProducts = async (section, selectedFilters) => {
      // getProductsBySection(section, selectedFilters).then((data) => {
      //   if (data.error) {
      //     console.log(data.error);
      //   } else {
      //     console.log(data);
      //     setProducts(data);
      //   }
      // });
      const data = await getProductsBySection(section, selectedFilters);
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setProducts(data);
      }
    };
    loadProducts(section, selectedFilters);
    return () => {
      abortController.abort();
    };
  }, [section, selectedFilters]);

  const filters = (showFilters) => {
    return (
      <div style={{ display: showFilters ? "" : "none" }}>
        <div className="picker">
          <h5>Color</h5>
          {typeof colorArray === "undefined" && (
            <ColorBar color={color} onColorChange={onColorChange} />
          )}
          {typeof colorArray !== "undefined" && (
            <label className="color-label">
              Color Palette
              <button
                className="color-btn"
                onClick={() => {
                  setSelectedFilters({
                    ...selectedFilters,
                    colorArray: undefined,
                  });
                }}
              >
                X
              </button>
            </label>
          )}
        </div>
        <br />
        <div className="the-filters">
          <div className="col">
            <h5>Brand</h5>
            <Checkboxes name="brand" value={brand} onChange={onBrandChange} />
          </div>
          <div className="col">
            <h5>Design</h5>
            <Checkboxes
              name="design"
              value={design}
              onChange={onDesignChange}
            />
          </div>
          <div className="col">
            <h5>Material</h5>
            <Checkboxes
              name="material"
              value={material}
              onChange={onMaterialChange}
            />
          </div>
          <div className="col">
            <h5>Application</h5>
            <Checkboxes
              name="application"
              value={application}
              onChange={onApplicationChange}
            />
          </div>
          {/* <div className="col">
            <h5>Property</h5>
            <Checkboxes
              name="property"
              value={property}
              onChange={onPropertyChange}
            />
          </div> */}
          <div className="col">
            <h5>Price</h5>
            <div className="group">
              <input
                type="radio"
                id="&#8377;0 to &#8377;9999999"
                name="price"
                value="0 9999999"
                onChange={(e) => onPriceChange(e)}
                defaultChecked
              />
              <label htmlFor="&#8377;0 to &#8377;9999999">Any price</label>
            </div>
            <div className="group">
              <input
                type="radio"
                id="&#8377;0 to &#8377;2499"
                name="price"
                value="0 2499"
                onChange={(e) => onPriceChange(e)}
              />
              <label htmlFor="&#8377;0 to &#8377;2499">
                &#8377;0 to &#8377;2499
              </label>
            </div>
            <div className="group">
              <input
                type="radio"
                id="&#8377;2500 to &#8377;4999"
                name="price"
                value="2500 4999"
                onChange={(e) => onPriceChange(e)}
              />
              <label htmlFor="&#8377;2500 to &#8377;4999">
                &#8377;2500 to &#8377;4999
              </label>
            </div>
            <div className="group">
              <input
                type="radio"
                id="&#8377;5000 to &#8377;7499"
                name="price"
                value="5000 7499"
                onChange={(e) => onPriceChange(e)}
              />
              <label htmlFor="&#8377;5000 to &#8377;7499">
                &#8377;5000 to &#8377;7499
              </label>
            </div>
            <div className="group">
              <input
                type="radio"
                id="&#8377;7500 and above"
                name="price"
                value="7500 9999999"
                onChange={(e) => onPriceChange(e)}
              />
              <label htmlFor="&#8377;7500 and above">
                &#8377;7500 and above
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
    if (filterArrow === 9662) {
      setFilterArrow(9652);
    } else {
      setFilterArrow(9662);
    }
  };

  return (
    <div className="container gallery">
      <h1>{section}s</h1>
      {/* <span>{products.length} items available</span> */}
      <div className="grid-menu">
        <div className="filters">
          <h3 onClick={handleFilterClick}>
            Filters {String.fromCharCode(filterArrow)}
          </h3>
        </div>
        <div className="grid-buttons">
          <span onClick={() => handleGrid("gallery-grid")}>
            <sup>2 </sup>
            <BsSquareFill />
          </span>
          <span onClick={() => handleGrid("gallery-grid grid-4")}>
            <sup>4 </sup>
            <BsFillGridFill />
          </span>
          <span onClick={() => handleGrid("gallery-grid grid-8")}>
            <sup>8 </sup>
            <BsFillGrid3X3GapFill />
          </span>
        </div>
      </div>
      {filters(showFilters)}
      <br />
      <h3 className="product-length">{products.length} items available</h3>
      <br />
      <div className={gridClass}>
        {/* <Link to="/" className="gallery-item">
          <img src={require("../assets/images/J-161.jpg")} alt="fabric" />
          <p>Blossom</p>
        </Link>
        <Link to="/product/example" className="gallery-item">
          <img src={require("../assets/images/J-604.jpg")} alt="fabric" />
          <p>Acrilan</p>
        </Link>
        <Link to="/" className="gallery-item">
          <img src={require("../assets/images/J-597.jpg")} alt="fabric" />
          <p>Acrilan</p>
        </Link>
        <Link to="/" className="gallery-item">
          <img src={require("../assets/images/J-598.jpg")} alt="fabric" />
          <p>Acrilan</p>
        </Link>
        <Link to="/" className="gallery-item">
          <img src={require("../assets/images/J-599.jpg")} alt="fabric" />
          <p>Acrilan</p>
        </Link>
        <Link to="/" className="gallery-item">
          <img src={require("../assets/images/J-602.jpg")} alt="fabric" />
          <p>Acrilan</p>
        </Link>
        <Link to="/" className="gallery-item">
          <img src={require("../assets/images/J-603.jpg")} alt="fabric" />
          <p>Acrilan</p>
        </Link>
        <Link to="/" className="gallery-item">
          <img src={require("../assets/images/J-607.jpg")} alt="fabric" />
          <p>Acrilan</p>
        </Link> */}
        {/* {JSON.stringify(products)} */}
        {products.map((product, i) => (
          <Link key={i} to={`/product/${product._id}`} className="gallery-item">
            <Suspense fallback={<div>Loading...</div>}>
              <ShowImage item={product} url="product" />
            </Suspense>
            <h3>{product.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
