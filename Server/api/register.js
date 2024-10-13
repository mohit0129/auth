// register.js
const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, gender, email, mobileno, password } = req.body;

  if (!name || !gender || !email || !mobileno || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = new Users({
      name,
      gender,
      email,
      mobile: mobileno,
      password: hashedPassword,
    });

    await users.save();
    res.status(200).json({ message: "Registration successful." });
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json({ message: "Registration failed. Email might already be in use." });
  }
});

module.exports = router;
