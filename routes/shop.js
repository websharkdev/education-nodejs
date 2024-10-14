const path = require("path");

const express = require("express");
const router = express.Router();
const adminData = require("./admin"); // Importing the admin routes

router.get("/", (req, res, next) => {
  const { products } = adminData;
  res.render("shop", {
    prod: products,
    pageTitle: "Shop",
    path: "/",
  });
});

module.exports = router; // Exporting the router
