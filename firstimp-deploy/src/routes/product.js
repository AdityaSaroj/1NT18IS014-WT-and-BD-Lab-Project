const express = require("express");

const router = express.Router();

const {
    displayProducts,
    getProductsBySection,
    getMoreColors,
    photo,
    productById,
    viewProduct,
    filterProps,
    // filteredProducts,
    searchByColour,
} = require("../controllers/product");
router.get("/products", displayProducts);
router.post("/productsby", getProductsBySection); //use getProductsBySection for filtering also
router.get("/morecolors", getMoreColors);
router.param("productId", productById);
router.get("/product/photo/:productId", photo);
router.get("/product/view/:productId", viewProduct);
router.get("/products/filterValues", filterProps);
// router.get("/products/:pfilter", filteredProducts);
router.post("/products/searchByColour", searchByColour);
module.exports = router;
