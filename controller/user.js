const { User } = require("../model/user.js");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users", err });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Error fetching user", err });
  }
};

exports.replaceUser = async (req, res) => {
  try {
    const user = await User.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Successfully Updated", user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Error updating user", err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Successfully Updated", user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Error updating user", err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Successfully Deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Error deleting user", err });
  }
};
