const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hash = bcrypt.hashSync(password, 10);
    const token = jwt.sign({ email }, process.env.SECRET_KEY);

    const newUser = new User({
      ...req.body,
      password: hash,
      token,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ token });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error creating user", err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isAuth = bcrypt.compareSync(String(password), user.password);

    if (isAuth) {
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
      user.token = token;
      await user.save();
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Error logging in", err });
  }
};
