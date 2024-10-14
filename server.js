const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // Creating an express app

app.set("view engine", "ejs"); // Setting the view engine to ejs
app.set("views", "views"); // Setting the views folder

const adminData = require("./routes/admin"); // Importing the admin routes
const shopRoutes = require("./routes/shop"); // Importing the shop routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public", { root: __dirname }));

app.use("/admin", adminData.routes);
app.use(shopRoutes); 

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: 'Page not found' });
});

app.listen(3000); // Listening to port 3000
