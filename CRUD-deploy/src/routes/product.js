const express = require('express');

const router = express.Router();

const {
    productById,
    create,
    list,
    photo,
    viewProduct,
    searchProduct,
    updated,
    deleted,
    dropdownList,
    allorders,
    orderedprod,
    viewOrder,
    deletedord,
} = require('../controllers/product');
const { bulkUpload } = require('../controllers/bulkUpload');

router.delete('/order/delete/:orderId', deletedord);
router.get('/order/view/:orderId', viewOrder);
router.get('/product', list);
router.get('/orders', allorders);
router.post('/orders/:productId',orderedprod);
router.get('/product/view/:productId', viewProduct);
router.get('/product/search/:pName', searchProduct);
router.post('/product/create', create);
router.get('/product/photo/:productId', photo);
router.get('/product/bulkUpload', bulkUpload);
router.param('productId', productById);
router.put('/product/update/:pId', updated);
router.delete('/product/delete/:pId', deleted);
router.get('/product/dropdown', dropdownList);

module.exports = router;
