const express = require("express");
const {
  getAllUsers,
  getUser,
  replaceUser,
  updateUser,
  deleteUser,
} = require("../controller/user.js");
const router = express.Router();

router
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .put("/:id", replaceUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

exports.router = router;
