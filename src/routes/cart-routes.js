// require express router
const router = require("express").Router();
const Cart = require("../models/cart");
const { auth } = require("../middleware/auth");

// create new cart
router.post("/", auth, async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const newCart = await cart.save();
    return res.status(201).json(newCart);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// update cart by id
router.put("/:id", auth, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error updating cart" });
  }
});

// get cart bu user id
router.get("/:userId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error getting cart" });
  }
});

// export the router
module.exports = router;
