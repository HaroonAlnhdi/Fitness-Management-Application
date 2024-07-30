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
    const { username, password, confirmPassword, first_name,last_name, cpr, email, PhoneNumber,address,picture } = req.body;

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
    const newUser = await User.create({
      username,
      password: hashedPassword,
      first_name,
      last_name,
      cpr,
      email,
      phoneNumber: PhoneNumber,
      address,
      picture,

    });
  
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Handle admin sign-up
router.post('/sign-up/admin', async (req, res) => {
  try {
    const {
      username, password, confirmPassword, first_name,last_name, cpr, email, PhoneNumber } = req.body;
    
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
      const newAdmin = await Admin.create({
        username,
        password: hashedPassword,
        first_name,
        last_name,
        cpr,
        email,
        phoneNumber: PhoneNumber
      });
  
      // // Create session data
      // req.session.user = {
      //   username: newAdmin.username,
      //   _id: newAdmin._id,
      //   isAdmin: true
      // };


    res.redirect('/controlPanel/admins');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



// post  the Sign in :
router.post('/sign-in', async (req, res) => {
  try {
    const { username, password } = req.body;

    // First, try to find the user in the User collection
    let userInDatabase = await User.findOne({ username });

    if (!userInDatabase) {
      // If not found in User collection, try the Admin collection
      userInDatabase = await Admin.findOne({ username });
      if (!userInDatabase) {
        return res.send('Login failed. Please try again.');
      }
    }

    // Check the password
    const validPassword = bcrypt.compareSync(password, userInDatabase.password);
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }

    const adminInDatabase = userInDatabase;
    // Set the session and redirect based on role
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
      role: userInDatabase.role
    };

    if (userInDatabase.role === 'admin') {
    
      // res.redirect('/controlPanel/dashboard', { admin: adminInDatabase });  
      res.redirect('/controlPanel/dashboard'); // Redirect to admin dashboard
    } else {
      res.redirect('/'); // Redirect to user home page
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



module.exports = router;
