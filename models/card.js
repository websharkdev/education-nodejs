const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

module.exports = class Card {
    static addProduct(id, price) {

        fs.readFile(p, (error, fileContent) => {
            let card = {
                products: [],
                totalPrice: 0
            }
            if(!error) {
                card = JSON.parse(fileContent)
            }


            const existingID = card.products.findIndex((product) => product.id === id)
            const existing = card.products[existingID]
            let updatedProduct 
            if(existing) {
                updatedProduct = {...existing }
                updatedProduct.qty = updatedProduct.qty + 1
                card.products = [...card.products]
                card.products[existingID] = updatedProduct;
            } else {
                updatedProduct = {id, qty: 1}
                card.products = [...card.products, updatedProduct]
            }


            // TOTAL PRICE

            card.totalPrice = card.totalPrice + +price;

            // SAVE
            
            fs.writeFile(p, JSON.stringify(card), (e) => {
                console.log(e)
            });
        })
    }




    static deleteProduct(id, price) {

        fs.readFile(p, (error, fileContent) => {
          if (error) {
            return;
          }


          const updated = { ...JSON.parse(fileContent) };

          const product = updated.products.find((product) => product.id === id);

          if(!product) {
            return
          }

          const productQTY = product.qty;

          updated.products = updated.products.filter(
            (product) => product.id !== id
          );

          updated.totalPrice = updated.totalPrice - price * productQTY;

          // SAVE

          fs.writeFile(p, JSON.stringify(updated), (e) => {
            console.log(e);
          });
        });

    }



    static getCard(cb) {
        fs.readFile(p, (error, fileContent) => {
            const card = JSON.parse(fileContent)

            if(error) {
                cb(null)
            }
            cb(card)
        })

    }
}