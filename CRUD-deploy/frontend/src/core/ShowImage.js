import React from 'react';

const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`https://firstimp-admin.herokuapp.com/api/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ height: '285px', width: '285px' }}
        />
    </div>
);

export default ShowImage;
