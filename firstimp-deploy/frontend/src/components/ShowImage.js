import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ShowImage = ({ item, url, height, width }) => (
    <LazyLoadImage
        src={`https://firstimp.herokuapp.com/api/${url}/photo/${item._id}`}
        alt={item.name}
        style={{
            maxHeight: "100%",
            maxWidth: "100%",
            height: height ? height : "",
            width: width ? width : "",
        }}
        key={Date.now()}
        effect="blur"
    />
);

export default ShowImage;
