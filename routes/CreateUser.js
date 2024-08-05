const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEndYouTubeChannel1$#";

//NO need to install like npm
const router = express.Router();
const User = require("../model/User");

router.post(
  "/createuser",
  [
    //Validator************
    body("email").isEmail(),
    body("name", "Incorrect name format kindly check once again").isLength({
      min: 5,
    }),
    body(
      "password",
      "Incorrect password format kindly check once again"
    ).isLength({ min: 5 }),
  ],
  //Validator************

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
        // name: req.body.name,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//I am check that user entered email and password is present in database or not
router.post(
  "/loginuser",
  [
    //Validator************
    body("email").isEmail(),

    body(
      "password",
      "Incorrect password format kindly check once again"
    ).isLength({ min: 5 }),
  ],
  //Validator************
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Email id is not found." });
      }
      //comparing the password
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res.status(400).json({ errors: "password is incorrect." });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.status(400).json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
