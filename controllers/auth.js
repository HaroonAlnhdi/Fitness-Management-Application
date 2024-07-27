const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const Admin = require('../models/admin.js');

// Render user sign-up page
router.get('/sign-up/user', (req, res) => {
  res.render('auth/sign-up-user.ejs');
});

// Render admin sign-up page
router.get('/sign-up/admin', (req, res) => {
  res.render('auth/sign-up-admin.ejs');
});

// Render sign-in page
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

// Handle sign-out
router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Handle user sign-up
router.post('/sign-up/user', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }
    
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.send('Password and Confirm Password must match');
    }
    
    // Hash the password before sending to the database
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Create a new user
    await User.create({ username, password: hashedPassword });
    
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Handle admin sign-up
router.post('/sign-up/admin', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    
    // Check if the username is already taken
    const adminInDatabase = await Admin.findOne({ username });
    if (adminInDatabase) {
      return res.send('Username already taken.');
    }
    
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.send('Password and Confirm Password must match');
    }
    
    // Hash the password before sending to the database
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Create a new admin
    await Admin.create({ username, password: hashedPassword });
    
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Handle user and admin sign-in
router.post('/sign-in', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check both user and admin collections
    const userInDatabase = await User.findOne({ username });
    const adminInDatabase = await Admin.findOne({ username });
    
    const user = userInDatabase || adminInDatabase;
    const isAdmin = !!adminInDatabase;
    
    if (!user) {
      return res.send('Login failed. Please try again.');
    }
    
    // Validate password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }
    
    // Create session data
    req.session.user = {
      username: user.username,
      _id: user._id,
      isAdmin: isAdmin
    };
    
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;