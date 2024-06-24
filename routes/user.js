const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
} = require("../controller/user.js");
const router = express.Router();

router
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .post("/", createUser)
  .put("/:id", replaceUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

exports.router = router;
