const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser'); 

const JWT_SECRET= process.env.JWT_SECRET;


//REGISTER
router.post("/register", fetchuser, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();

    return res.status(200).json(user);

  } catch (err) {

    return res.status(500).json(err);

  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("User not Found");
    }
    
    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }

    // creating JWT Token changes 02-04-2022
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    const { password, ...others } = user._doc;

    return res.json({others, authtoken });

  } catch (err) {
    return res.status(500).json("Some Thing Went Wroung");
  }
});

module.exports = router;
