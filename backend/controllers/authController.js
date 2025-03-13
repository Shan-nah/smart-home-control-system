const { auth } = require("../config/firebase");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await auth.getUserByEmail(email);
    res.status(200).json({ message: "Login Successful", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await auth.createUser({ email, password });
    res.status(201).json({ message: "User Registered", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup };
