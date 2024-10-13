// login.js
const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      // Update the last login time
      user.lastLogin = new Date();
      await user.save();

      return res.json({ flag: "1", name: user.name, id: user._id });
    } else {
      return res.json({ flag: "0", message: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ flag: "0", message: "Database error" });
  }
});

module.exports = router;
