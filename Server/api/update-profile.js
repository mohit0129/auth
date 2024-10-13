// update-profile.js
const express = require('express');
const Users = require('../models/Users');

const router = express.Router();

// update-profile.js
router.get('/get-profile', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ flag: "0", message: "User ID is required." });
  }

  try {
    const user = await Users.findById(id, 'name gender email mobile createdAt lastLogin');
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ flag: "0", message: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching profile data: ", error);
    return res.status(500).json({ flag: "0", message: "Database error" });
  }
});


router.post('/update-profile', async (req, res) => {
  const { id, name, gender, email, mobile } = req.body;

  if (!id || !name || !email || !gender || !mobile) {
    return res.status(400).json({ flag: "0", message: "All fields are required." });
  }

  try {
    const user = await Users.findById(id);
    if (user) {
      user.name = name;
      user.gender = gender;
      user.email = email;
      user.mobile = mobile;
      await user.save();

      return res.json({ flag: "1", message: "Profile updated successfully." });
    } else {
      return res.status(404).json({ flag: "0", message: "User not found." });
    }
  } catch (error) {
    console.error("Error updating profile: ", error);
    return res.status(500).json({ flag: "0", message: "Database error" });
  }
});

module.exports = router;
