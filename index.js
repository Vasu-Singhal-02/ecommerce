require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
const authRouter = require("./routes/auth.js");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");

// server initialized
const server = express();

// enable cors to listen between different ports
server.use(cors());

// authentication middleware
const auth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.email) {
        next();
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

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
server.use("/auth", authRouter.router);
server.use("/api/products", auth, productRouter.router);
server.use("/api/users", auth, userRouter.router);

// catch-all handler for SPA
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, process.env.PUBLIC_DIR, "index.html"));
});

// server port 8080
server.listen(process.env.PORT, () => {
  console.log("server starts");
});
