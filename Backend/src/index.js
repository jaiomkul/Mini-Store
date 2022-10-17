const express = require("express");

const cors = require("cors");

const productsController = require("./controllers/product.controller");

const userController = require("./controllers/user.controller");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/products", productsController);

app.use("/users", userController);

module.exports = app;
