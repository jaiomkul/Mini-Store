const express = require("express");

const { body, validationResult } = require("express-validator");

const User = require("../models/user.module");

const router = express.Router();

router.post("/", body("firstName").not().isEmpty(), async (req, res) => {
  try {
    console.log(body("firstName"));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send({ users: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id).lean().exec();

    return res.status(200).send({ users: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
