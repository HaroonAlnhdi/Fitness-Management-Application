const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const Admin = require('../models/admin.js');

// Render user sign-up page
router.get('/dashboard', (req, res) => {
  res.render('admin/dashbord.ejs');
});

router.get('/members', (req, res) => {
  res.render('admin/members.ejs');
});

router.get('/trainers', (req, res) => {
  res.render('admin/trainers.ejs');
});

router.get('/admins', (req, res) => {
  res.render('admin/admins.ejs');
});

router.get('/packages', (req, res) => {
  res.render('admin/packages.ejs');
});

module.exports = router;