const express = require("express");

const Product = require("../models/product.model");
const ApiFeatures = require("../utils/apiFeatures");

const router = express.Router();

/*
body => req.body
url => req.paramas
query => req.query
*/

router.get("/", async (req, res) => {
  try {
    const pagesize = req.query.pagesize || 12;

    // Api Feature query
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(pagesize);

    //Final output
    const products = await apiFeature.query.lean().exec();

    const totalPages = Math.ceil(
      (await Product.find().countDocuments()) / pagesize
    );

    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
