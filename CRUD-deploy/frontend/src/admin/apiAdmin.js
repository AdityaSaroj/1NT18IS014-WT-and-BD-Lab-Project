//import { API } from "../config";

export const createProduct = (product) => {
    return fetch(`https://firstimp-admin.herokuapp.com/api/product/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: product,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateProduct = (productId, product) => {
    return fetch(
        `https://firstimp-admin.herokuapp.com/api/product/update/${productId}`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
            },
            body: product,
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteProduct = (productId) => {
    return fetch(
        `https://firstimp-admin.herokuapp.com/api/product/delete/${productId}`,
        {
            method: 'DELETE',
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
