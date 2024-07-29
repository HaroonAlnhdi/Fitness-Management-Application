const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const Admin = require('../models/admin.js');

// Render user sign-up page
router.get('/dashboard', (req, res) => {
  res.render('admin/dashbord.ejs');
});

module.exports = router;