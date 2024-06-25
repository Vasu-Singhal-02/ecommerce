const { Product } = require("../model/product.js");

exports.getAllProducts = async (req, res) => {
  try {
    let query = Product.find({});
    let length = await Product.countDocuments();

    if (req.query.sort) {
      query = query.sort({ [req.query.sort]: req.query.order });
    }

    if (req.query.skip) {
      query = query.skip(req.query.skip);
    }

    if (req.query.limit) {
      query = query.limit(req.query.limit);
    }

    const products = await query.exec();
    res.json({ products, length });
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Error fetching product", err });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Error fetching product", err });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: "Error creating product", err });
  }
};

exports.replaceProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Successfully Updated", product });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Error updating product", err });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Successfully Updated", product });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Error updating product", err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Successfully Deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Error deleting product", err });
  }
};
