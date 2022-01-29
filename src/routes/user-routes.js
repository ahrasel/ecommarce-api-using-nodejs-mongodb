const { auth } = require("../middleware/auth");
const User = require("../models/user");
const cryptoJs = require("crypto-js");

// require express router
const router = require("express").Router();

// create a new user by admin
router.post("/", auth, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// update user by id
router.put("/:id", auth, async (req, res) => {
  // encrypt password
  const { password } = req.body;
  if (password) {
    const encryptedPassword = cryptoJs.AES.encrypt(password, process.env.PASS_SECRET).toString();
    req.body.password = encryptedPassword;
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error, message: "Error updating user" });
  }
});

// delete user by id
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error, message: "Error deleting user" });
  }
});

// get all users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error, message: "Error getting users" });
  }
});

// get user stats
router.get("/stats", auth, async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error, message: "Error getting user stats" });
  }
});

// get user by id
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error, message: "Error getting user" });
  }
});

// export the router
module.exports = router;
