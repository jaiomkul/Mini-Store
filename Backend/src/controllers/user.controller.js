const express = require("express");

const { body, validationResult } = require("express-validator");

const User = require("../models/user.module");

const router = express.Router();

router.post(
  "/",
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 4 charaters"),
  body("lastName").trim().not().isEmpty(),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      if (!value.match(passw)) {
        throw new Error("Password must be strong");
      }
      return true;
    })
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password and Confirm Password should match");
      }
      return true;
    }),

  body("birthdate")
    .isDate()
    .custom((value) => {
      if (value < 0 || value > 120) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),

  async (req, res) => {
    try {
      console.log(body("firstName"));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
      });

      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
);

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
