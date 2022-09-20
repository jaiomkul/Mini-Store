const express = require("express");

const Product = require("../models/product.model");

const router = express.Router();

/*
body => req.body
url => req.paramas
query => req.query
*/

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 12;
    // const pagesize = req.query.pagesize && 12;
    // const pagesize  = 10 && 12 // undefind;
    // const pagesize  = 12 && 12 // undefind; data(true )output

    // if page 1 then data should be from 1 to 12;
    // if page 1 then data should be from 13 to 24;

    const skip = (page - 1) * pagesize; // 1-1 =0, 0*anything = 0;

    const products = await Product.find()
      .skip(skip)
      .limit(pagesize)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await Product.find().countDocuments()) / pagesize
    );

    return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
