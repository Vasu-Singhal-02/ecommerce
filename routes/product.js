const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.js");
const router = express.Router();

router
  .get("/", getAllProducts)
  .get("/:id", getProduct)
  .post("/", createProduct)
  .put("/:id", replaceProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

exports.router = router;
