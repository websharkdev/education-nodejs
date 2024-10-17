const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};


exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.price); 
    product.save()
    res.redirect("/");
};


exports.getShop = (req, res, next) => {

    Product.fetchAll((products) => {
        res.render("shop/product-list", {
            prod: products,
            pageTitle: "Shop",
            path: "/",
        });
    });

}