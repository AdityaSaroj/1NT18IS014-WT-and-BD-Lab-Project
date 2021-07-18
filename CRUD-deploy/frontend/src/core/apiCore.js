export const getProducts = () => {
    return fetch(`https://firstimp-admin.herokuapp.com/api/product`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getOrders = () => {
    return fetch(`https://firstimp-admin.herokuapp.com/api/orders`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getDropdowns = () => {
    return fetch(`https://firstimp-admin.herokuapp.com/api/product/dropdown`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const read = (productId) => {
    return fetch(
        `https://firstimp-admin.herokuapp.com/api/product/view/${productId}`,
        {
            method: 'GET',
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const readorder = (orderId) => {
    return fetch(
        `https://firstimp-admin.herokuapp.com/api/order/view/${orderId}`,
        {
            method: 'GET',
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const searchProduct = (pName) => {
    return fetch(
        `https://firstimp-admin.herokuapp.com/api/product/search/${pName}`,
        {
            method: 'GET',
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteOrder = (orderId) => {
    return fetch(
        `https://firstimp-admin.herokuapp.com/api/order/delete/${orderId}`,
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
