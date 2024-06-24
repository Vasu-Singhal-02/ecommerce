require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
const mongoose = require("mongoose");
const path = require("path");

// server initialized
const server = express();

// enable cors to listen between different ports
server.use(cors());

// db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("db connected");
}

// middlewares
server.use(express.json());
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

// routes
server.use("/api/products", productRouter.router);
server.use("/api/users", userRouter.router);

// catch-all handler for SPA
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"));
});

// server port 8080
server.listen(process.env.PORT, () => {
  console.log("server starts");
});
