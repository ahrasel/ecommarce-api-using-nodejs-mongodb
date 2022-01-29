// require express router
const router = require("express").Router();
const Product = require("../models/product");
const { auth } = require("../middleware/auth");

// create new product
router.post("/", auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// update product by id
router.put("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error updating product" });
  }
});

// delete product by id
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error deleting product" });
  }
});

// get all products
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error getting products" });
  }
});

// get product by id
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error getting product" });
  }
});

// export the router
module.exports = router;
