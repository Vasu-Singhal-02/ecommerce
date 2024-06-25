const express = require("express");
const router = express.Router();
const { login, signUp } = require("../controller/auth.js");

router.post("/signup", signUp).post("/login", login);

exports.router = router;
