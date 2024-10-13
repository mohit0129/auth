// app.js
const express = require('express');
const cors = require('cors');
require('./db'); // MongoDB connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use(require('./api/password-reset'));
app.use(require('./api/login'));
app.use(require('./api/register'));
app.use(require('./api/change-password'));
app.use(require('./api/update-profile'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
