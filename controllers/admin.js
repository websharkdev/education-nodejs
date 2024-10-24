const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;


  req.user.createProduct({
    title,
    description,
    imageURL: imageURL,
    price,
  })
    .then((result) => res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const productID = req.params.productID;

  Product.findByPk(productID).then((product) =>
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/products",
      editing: Boolean(editMode),
      data: product,
    })
  );
};

exports.postEditProduct = (req, res, next) => {
  const productID = req.body.productID;

  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(productID)
    .then((product) => {
      product.title = title;
      product.imageURL = imageURL;
      product.price = price;
      product.description = description;

      return product.save();
    })
    .then((result) => res.redirect("/"))
    .catch((e) => console.log(e));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productID = req.body.productID;
  Product.findByPk(productID)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/");
    })
    .catch((e) => console.log(e));
};
