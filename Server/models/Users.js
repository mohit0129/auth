// models/Users.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Automatically set the creation date
  lastLogin: { type: Date } // Will be updated on each login
});

const Users = mongoose.model('Users', UserDataSchema);

module.exports = Users;
