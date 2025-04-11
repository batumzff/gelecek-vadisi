const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("./token");

module.exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    await user.save();
    delete user.dataValues.password;
    res.status(201).json({
      message: "User created successfully",
      user: user,
      token: generateToken({ id: user.id, email: user.email }, "999d"),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error creating user",
      error,
    });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  User.findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "not matched" });
      }
      delete user.dataValues.password;
      res.status(200).json({
        message: "Login successful",
        user,
        token: generateToken({ id: user.id, username: user.username }, "999d"),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error", error: err });
    });
};
