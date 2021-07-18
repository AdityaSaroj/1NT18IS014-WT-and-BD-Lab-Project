import React, { useState, useEffect } from "react";
import { GlassMagnifier } from "react-image-magnifiers";
import { Link } from "react-router-dom";
import { getSingleProduct, getMoreColors } from "../api/apiCore";
import ShowImage from "./ShowImage";
import { FaWhatsappSquare } from "react-icons/fa";

const Product = (props) => {
    const productId = props.match.params.productId;
    /* eslint-disable no-unused-vars */
    const [values, setValues] = useState({
        allowOverflow: true,
        magnifierBorderSize: 3,
        magnifierBorderColor: "rgba(255,255,255,0.5)",
        magnifierSize: "40%",
        square: false,
        cursorStyle: "crosshair",
    });
    /* eslint-enable no-unused-vars */

    const [product, setProduct] = useState({});
    const [application, setApplication] = useState("");
    const [instruction, setInstruction] = useState("");
    const [property, setProperty] = useState("");
    const [moreColors, setMoreColors] = useState([]);

    const loadSingleProduct = (productId) => {
        getSingleProduct(productId).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                // setProduct({ ...data, discount: 10 });
                setProduct(data);
                setApplication(data.application);
                setInstruction(data.instruction);
                setProperty(data.property);
                loadMoreColors(data.name);
                console.log(data);
            }
        });
    };

    const loadMoreColors = (name) => {
        getMoreColors(name).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMoreColors(data);
            }
        });
    };

    useEffect(() => {
        loadSingleProduct(productId);
        // eslint-disable-next-line
    }, [props]);

    const [tab1, setTab1] = useState(
        product.description ? "showTab" : "hideTab"
    );
    const [tab2, setTab2] = useState(
        product.description ? "hideTab" : "showTab"
    );
    const [tab1btnClass, setTab1btnClass] = useState(
        product.description ? "tab-btn active" : "tab-btn"
    );
    const [tab2btnClass, setTab2btnClass] = useState(
        product.description ? "tab-btn" : "tab-btn active"
    );

    const {
        allowOverflow,
        magnifierSize,
        magnifierBorderSize,
        magnifierBorderColor,
        square,
        cursorStyle,
    } = values;

    return (
        <div className="container product">
            <div className="product-image">
                <GlassMagnifier
                    imageSrc={`https://firstimp.herokuapp.com/api/product/photo/${productId}`}
                    imageAlt={product.name}
                    allowOverflow={allowOverflow}
                    magnifierSize={magnifierSize}
                    magnifierBorderSize={magnifierBorderSize}
                    magnifierBorderColor={magnifierBorderColor}
                    square={square}
                    cursorStyle={cursorStyle}
                    // largeImageSrc={require("../assets/images/J-161.jpg")} // Optional
                    className="magnify"
                />
            </div>
            <div className="two">
                <span className="product-title">{product.name}</span>
                <h4> {product.productid} </h4>
                <br />
                {!product.discount ? (
                    <h3>&#x20B9; {product.price}</h3>
                ) : (
                    <h3>
                        <strike style={{ color: "grey" }}>
                            &#x20B9; {product.price}
                        </strike>{" "}
                        &#x20B9;
                        {product.price -
                            (product.price * product.discount) / 100}{" "}
                        <span className="discount-span">
                            {product.discount}% off
                        </span>
                    </h3>
                )}
                <p className="unavailable">
                    Online shopping is currently unavailable. Please{" "}
                    <Link to="/contact" className="product-contact">
                        contact us
                    </Link>
                    .
                </p>
                <button className="product-btn">Add to Cart</button>
                <button className="product-btn">Add to Moodboard</button>
                <br />
                <br />
                <a
                    href="https://wa.me/9199999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                >
                    <FaWhatsappSquare className="whatsapp-logo" size="30" />
                    <span> Contact us on Whatsapp</span>
                </a>
                <br />
                <div className="tabs">
                    {product.description && (
                        <button
                            className={tab1btnClass}
                            onClick={() => {
                                setTab1("showTab");
                                setTab2("hideTab");
                                setTab1btnClass("tab-btn active");
                                setTab2btnClass("tab-btn");
                            }}
                        >
                            Description
                        </button>
                    )}
                    <button
                        className={tab2btnClass}
                        onClick={() => {
                            setTab1("hideTab");
                            setTab2("showTab");
                            setTab1btnClass("tab-btn");
                            setTab2btnClass("tab-btn active");
                        }}
                    >
                        Specification
                    </button>
                </div>
                <p className={tab1}>{product.description}</p>
                <ul className={tab2}>
                    <li>
                        <span>Brand</span>
                        <span>{product.brand}</span>
                    </li>
                    <li>
                        <span>Material</span>
                        <span>{product.material}</span>
                    </li>
                    <li>
                        <span>Application</span>
                        <span>{application.split(",").join(", ")}</span>
                    </li>
                    <li>
                        <span>Width</span>
                        <span>{product.width}</span>
                    </li>
                    <li>
                        <span>Instruction</span>
                        <span>{instruction.split(",").join(", ")}</span>
                    </li>
                    <li>
                        {property && <span>Property</span>}
                        {property && (
                            <span>{property.split(",").join(", ")}</span>
                        )}
                    </li>
                </ul>
                <br />
                <h3>All Colors</h3>
                {moreColors.map((product, i) => (
                    <Link
                        key={i}
                        to={`/product/${product._id}`}
                        style={{ marginRight: "4px" }}
                    >
                        <ShowImage
                            item={product}
                            url="product"
                            height="50px"
                            width="50px"
                        />
                    </Link>
                ))}
                {/* <span>
          <Link to="/product/example">
            <img src={require("../assets/images/J-607.jpg")} alt="product" />
          </Link>
          <Link to="/product/example">
            <img src={require("../assets/images/J-597.jpg")} alt="product" />
          </Link>
          <Link to="/product/example">
            <img src={require("../assets/images/J-598.jpg")} alt="product" />
          </Link>
          <Link to="/product/example">
            <img src={require("../assets/images/J-599.jpg")} alt="product" />
          </Link>
          <Link to="/product/example">
            <img src={require("../assets/images/J-602.jpg")} alt="product" />
          </Link>
          <Link to="/product/example">
            <img src={require("../assets/images/J-603.jpg")} alt="product" />
          </Link>
          <Link to="/product/example">
            <img src={require("../assets/images/J-604.jpg")} alt="product" />
          </Link>
        </span> */}
            </div>
        </div>
    );
};

export default Product;
