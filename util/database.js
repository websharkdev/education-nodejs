const Sequelize = require('sequelize')


const sequelize = new Sequelize(
  "node-complete",
  "root",
  "Mm,Vwv2$hm7Tpp3Rhj8G", {
    dialect: 'mysql',
    host: 'localhost'
  }
);


module.exports = sequelize