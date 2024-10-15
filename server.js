const express = require("express");
const bodyParser = require("body-parser");
const defaultR = require('./controllers/default')

const app = express(); // Creating an express app

app.set("view engine", "ejs"); // Setting the view engine to ejs
app.set("views", "views"); // Setting the views folder

const adminRoutes = require("./routes/admin"); // Importing the admin routes
const shopRoutes = require("./routes/shop"); // Importing the shop routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public", { root: __dirname }));

app.use("/admin", adminRoutes);
app.use(shopRoutes); 

app.use("/", defaultR.getNotFounded);

app.listen(3000); // Listening to port 3000
