// require express router
const router = require("express").Router();
const Order = require("../models/order");
const { auth } = require("../middleware/auth");

// create new order
router.post("/", auth, async (req, res) => {
  try {
    const order = new Order(req.body);
    const newOrder = await order.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// update order
router.put("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error updating order" });
  }
});

// get order by id
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error getting order" });
  }
});

// delete order by id
router.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error deleting order" });
  }
});

// get all orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error getting orders" });
  }
});

// export the router
module.exports = router;
