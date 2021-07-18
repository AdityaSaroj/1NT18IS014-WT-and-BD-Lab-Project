//import { API } from "../config";

export const getProducts = () => {
    return fetch(`https://firstimp.herokuapp.com/api/products`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getSingleProduct = (productId) => {
    return fetch(
        `https://firstimp.herokuapp.com/api/product/view/${productId}`,
        {
            method: "GET",
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getProductsBySection = (section, filters) => {
    return fetch(
        `https://firstimp.herokuapp.com/api/productsby?section=${section}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filters),
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getMoreColors = (name) => {
    return fetch(`https://firstimp.herokuapp.com/api/morecolors?name=${name}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getFilterValues = () => {
    return fetch(`https://firstimp.herokuapp.com/api/products/filterValues`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
