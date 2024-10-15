
const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products"); // Importing the admin routes

router.get("/", productsController.getShop);

module.exports = router; // Exporting the router
