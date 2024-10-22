const Product = require("../models/product");
const Card = require("../models/card");



exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fields]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductItem = (req, res, next) => {
  const productID = req.params.productID;

  Product.fetchItem(productID, (product) => {
    res.render("shop/product-details", {
      product,
      pageTitle: "Product Item",
      path: "/product",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fields]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
  }).catch(err => console.log(err))

  
};

exports.getCart = (req, res, next) => {
  Card.getCard((card) => {

    // 
  Product.fetchAll()
    .then(([rows, fields]) => {
     const cardProducts = []

      rows.forEach((product) => {
        const cardProduct = card.products.find(
          (prod) => prod.id === product.id
        );

        if (cardProduct) {
          cardProducts.push({
            products: product,
            qty: cardProduct.qty,
          });
        }
      });
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        data: cardProducts,
      });
    })
    .catch((err) => console.log(err));
  });
};

exports.postCart = (req, res, next) => {
  const productID = req.body.productID;

  Product.fetchItem(productID, (product) => {
    Card.addProduct(productID, product.price);
  });

  res.redirect("/");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postDeleteCardItem = (req, res, next) => {

  const productID = req.body.productID

  Product.fetchItem(productID, (product) => {
    Card.deleteProduct(productID, product.price);
  });

  res.redirect("/");

};
