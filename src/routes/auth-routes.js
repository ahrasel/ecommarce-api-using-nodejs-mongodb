// require express router
const router = require("express").Router();
const User = require("../models/user");
const cryptoJs = require("crypto-js");

// register new user
router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error, message: "Error registering user" });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }
    const password = cryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET).toString(
      cryptoJs.enc.Utf8
    );
    if (password === req.body.password) {
      const { password, ...others } = user._doc;
      return res.status(200).json({
        message: "User logged in",
        user: others,
      });
    } else {
      return res.status(401).json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error logging in user" });
  }
});

// export the router
module.exports = router;
