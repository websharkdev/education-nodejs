const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// router.get('/products/delete', ) // Dynamic должен быть ниже чем статичный

router.get('/product/:productID', shopController.getProductItem)

router.get('/cart', shopController.getCart);

router.post('/card-delete-item', shopController.postDeleteCardItem)

router.post("/card", shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
