const fs = require("fs");

let users;

try {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8")); // Parse JSON string to js object
  users = data.users;
} catch (err) {
  console.error("Error reading data.json:", err);
}

const addToUsers = (user) => {
  try {
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    data.users.push(user);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error updating file: ", err);
  }
};

const updateUsersData = (index, user) => {
  try {
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    data.users.splice(index, 1, user);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error updating file: ", err);
  }
};

exports.getAllUsers = (req, res) => {
  if (!users) {
    return res.status(500).json({ error: "Products data not available" });
  }
  res.json(users);
};

exports.getUser = (req, res) => {
  if (!users) {
    return res.status(500).json({ error: "Products data not available" });
  }
  const user = users.find((user) => user.id === +req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(user);
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  if (!newUser.id || !newUser.title) {
    return res
      .status(400)
      .json({ error: "Product must have an id and a name" });
  }
  users.push(newUser);
  addToUsers(newUser);
  res.status(201).json(newUser);
};

exports.replaceUser = (req, res) => {
  if (!users) {
    return res.status(500).json({ error: "Products data not available" });
  }

  const userIndex = users.findIndex((user) => user.id === +req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const updatedUser = { id: +req.params.id, ...req.body };
  users.splice(userIndex, 1, updatedUser);
  updateUsersData(userIndex, updatedUser);

  res.json({ message: "Successfully Updated" });
};

exports.updateUser = (req, res) => {
  if (!users) {
    return res.status(500).json({ error: "Products data not available" });
  }

  const userIndex = users.findIndex((user) => user.id === +req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const oldUser = users[userIndex];
  const updatedUser = { ...oldUser, ...req.body };
  users.splice(userIndex, 1, updatedUser);
  updateUsersData(userIndex, updatedUser);

  res.json({ message: "Successfully Updated" });
};

exports.deleteUser = (req, res) => {
  if (!users) {
    return res.status(500).json({ error: "Products data not available" });
  }

  const userIndex = users.findIndex((user) => user.id === +req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  users.splice(userIndex, 1);

  try {
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    data.users.splice(userIndex, 1);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error updating file: ", err);
    return res.status(500).json({ error: "Error deleting product" });
  }

  res.json({ message: "Successfully Deleted" });
};
