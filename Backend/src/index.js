const express = require("express");

const productsController = require("./controllers/product.controller");

const userController = require("./controllers/user.controller");

const app = express();

app.use(express.json());

app.use("/products", productsController);

app.use("/users", userController);

module.exports = app;
