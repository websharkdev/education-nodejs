const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};



exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit
  const productID = req.params.productID;

  Product.fetchItem(productID, (product) =>
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/products",
      editing: Boolean(editMode),
      data: product,
    })
  );
};


exports.postEditProduct = (req, res, next) => {

  
  const productID = req.body.productID


  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(productID, title, imageUrl, description, price);
  product.save().then((res) => {
    console.log(res);
    res.redirect("/");
  }).catch((e) => console.log(error))
};



exports.getProducts = (req, res, next) => {  
  Product.fetchAll()
    .then(([rows, fields]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {
  const productID = req.body.productID;

  const existing = Product.deleteItem(productID);


  res.redirect("/");
};