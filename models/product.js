const fs = require('fs');
const path = require('path');
const crypto = require('crypto')
const Card = require('./card')
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    getProductsFromFile(products => {
      
    if (this.id) {
      const existing = products.findIndex((product) => product.id === this.id)
      const updated = [...products]

      updated[existing] = this    
      
      
      fs.writeFile(p, JSON.stringify(updated), (err) => {
        console.log(err);
      });
    } else {
      
      this.id = crypto.randomBytes(16).toString("hex");

      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deleteItem(id) {
    getProductsFromFile(products => {
      const current = products.find(product => product.id === id)
      const updated = products.filter((item) => item.id !== id);

      fs.writeFile(p, JSON.stringify(updated), (err) => {
        if(!err) {
          Card.deleteProduct(id, current.price);
        }
      });
    })
  }

  static fetchItem(id, cb) { 
    getProductsFromFile(products => {
      const productItem = products.find((item) => item.id === id)

      cb(productItem);
    })
  }
};
