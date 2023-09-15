const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "secret_token";
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//route 1///////////////////////////////////////////////////////////////////

router.post(
  "/createuser",
  [
    body("name", "enter a vaild name").isLength({ min: 2 }),
    body("email", "enter a vaild email").isEmail(),
    body("password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Please enter a valid Email and Password " });
    }
    let success = false;
    //create a user using post
    // const user = new User(req.body); //correct
    // user.save();  //correct
    // console.log(req.body);

    try {
      const salt = await bcrypt.genSalt(10);
      secPassword = await bcrypt.hash(req.body.password, salt);
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "user already exists" });
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        // password: req.body.password,
      });
      user = await User.findOne({ email: req.body.email });
      const data = {
        user: {
          id: user._id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log("user added sucessfully");
      res.send({ success: true, authtoken });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ success, error: "error in user creation" });
    }
  }
);

//route 2 /////////////////////////////////////////////////////////////////////
//authenticate a user

router.post(
  "/login",
  [
    body("email", "enter a vaild email").isEmail(),
    body("password", "enter a valid password").isLength({ min: 5 }),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    //create a user using post
    // const user = new User(req.body); //correct
    // user.save();  //correct
    // console.log(req.body);
    const { email, password } = req.body;
    let success = false;

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please enter correct creds" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please enter correct creds" });
      }

      const paylaod = {
        id: user.id,
      };
      const authtoken = jwt.sign(paylaod, JWT_SECRET);
      console.log("user logged in sucessfully");
      success = true;
      res.json({ success, authtoken });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success,
        error:
          "we cannot sign in you currently please try agian after sometime",
      });
    }
  }
);

//route 3  /////////////////////////////////////////////////////////////////////////
//get details of user

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user;
    // console.log(req);
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      error: "we cannot sign in you currently please try agian after sometime",
    });
  }
});
module.exports = router;
