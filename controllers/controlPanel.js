const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const Admin = require('../models/admin.js');
const Packages = require('../models/packages.js');
const Trainer =require("../models/trainer.js")

// Render user sign-up page
router.get('/dashboard', (req, res) => {
  res.render('admin/dashbord.ejs');
});

router.get('/members', async (req, res) => {
  const members = await User.find();
  res.render('admin/members.ejs',{members});
});

router.get('/trainers', async (req, res) => {
  const trainers = await Trainer.find();
  res.render('admin/trainers.ejs',{trainers});
});

router.get('/admins', async (req, res) => {
  const admin = await Admin.find();
  res.render('admin/admins.ejs',{admin});
});

router.get('/packages',async (req, res) => {
  const package = await Packages.find();
  res.render('admin/packages.ejs',{package});
});

// Fpr Admin:-
// Edit admins:
router.get('/:adminId/edit', async (req, res) => {
  try {
    const adminId = req.params.adminId;
    
    // Fetch the admin details based on the adminId
    const admin = await Admin.findById(adminId);
    
    res.render('admin/edits/editAdmin.ejs', { admin });
  } catch (error) {
    console.log(error);
    res.redirect('/admins'); // Redirect to the admin list page if an error occurs
  }
});

router.put('/:adminId/edit', async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const updatedData = req.body;

    // Find the admin by ID and update the details
    await Admin.findByIdAndUpdate(adminId, updatedData);

    res.redirect(`/controlPanel/admins`); 
  } catch (error) {
    console.error(error);
    res.send('Error updating admin details');
  }
});

// Delete admin:
router.delete('/:adminId/edit', async (req, res) => {

  try {


    const result = await Admin.deleteOne({ _id: req.params.adminId });

    // Check if any document was deleted
    if (result.deletedCount === 0) {
      console.log('Recipe not found or already deleted');
      return res.redirect(`/controlPanel/admins`);
    }
    res.redirect(`/controlPanel/admins`);

  } catch (error) {

    console.log(error);
    res.redirect('/')
  }
});


// For User :

router.get('/:memberId/edituser', async (req, res) => {
  try {
    const memberId = req.params.memberId;
    
    // Fetch the admin details based on the adminId
    const member = await User.findById(memberId);
    
    res.render('admin/edits/editMember.ejs', { member });
  } catch (error) {
    console.log(error);
    res.redirect('/controlPanel/admins');
  }
});

router.put('/:memberId/edituser', async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const updatedData = req.body;

    // Find the admin by ID and update the details
    await User.findByIdAndUpdate(memberId, updatedData);

    res.redirect(`/controlPanel/members`); 
  } catch (error) {
    console.error(error);
    res.send('Error updating member details');
  }
});

// delete user 

router.delete('/:memberId/edituser', async (req, res) => {

  try {


    const result = await User.deleteOne({ _id: req.params.memberId });

    // Check if any document was deleted
    if (result.deletedCount === 0) {
      console.log('Member not found or already deleted');
      return res.redirect(`/controlPanel/members`);
    }
    res.redirect(`/controlPanel/members`);

  } catch (error) {

    console.log(error);
    res.redirect('/')
  }
});



//  For Packages:

router.get('/packages/new', async (req, res) => {

  res.render('admin/new/newPackages.ejs');
});


//  Create package:
router.post('/packages/new', async (req, res) => {
  try {
    const fitnessPackage = new Packages(req.body);
    await fitnessPackage.save();
    res.redirect('/controlPanel/packages');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Get the package details for editing
router.get('/:packageId/editPackeg', async (req, res) => {
  try {
    const packageId = req.params.packageId;
    
    // Fetch the package details based on the packageId
    const fitnessPackage = await Packages.findById(packageId);
    
    res.render('admin/edits/editPackes.ejs', { fitnessPackage });
  } catch (error) {
    console.log(error);
    res.redirect('/controlPanel/packages');
  }
});

// Update the package details
router.put('/:packageId/editPackeg', async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const updatedData = req.body;

    // Find the package by ID and update the details
    await Packages.findByIdAndUpdate(packageId, updatedData);

    res.redirect('/controlPanel/packages'); 
  } catch (error) {
    console.error(error);
    res.send('Error updating package details');
  }
});

router.delete('/:packageId/editPackeg', async (req, res) => {

  try {


    const result = await Packages.deleteOne({ _id: req.params.packageId });

    // Check if any document was deleted
    if (result.deletedCount === 0) {
      console.log('package not found or already deleted');
      return res.redirect(`/controlPanel/packages`);
    }
    res.redirect(`/controlPanel/packages`);

  } catch (error) {

    console.log(error);
    res.redirect('/')
  }
});


// for Trainer :


// GET form to create new trainer
router.get('/trainers/new', (req, res) => {
  res.render('admin/new/newTrainer.ejs');
});

// POST new trainer
router.post('/trainers/new', async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.redirect('/controlPanel/trainers');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET form to edit trainer
router.get('/:trainerId/editTrainer', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.trainerId);
    res.render('admin/edits/editTrainer.ejs', { trainer });
  } catch (error) {
    console.error(error);
    res.redirect('/controlPanel/trainers');
  }
});

// PUT update trainer
router.put('/:trainerId/editTrainer', async (req, res) => {
  try {
    await Trainer.findByIdAndUpdate(req.params.trainerId, req.body);
    res.redirect('/controlPanel/trainers');
  } catch (error) {
    console.error(error);
    res.send('Error updating trainer details');
  }
});

// DELETE trainer
router.delete('/:trainerId/editTrainer', async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.trainerId);
    res.redirect('/controlPanel/trainers');
  } catch (error) {
    console.error(error);
    res.send('Error deleting trainer');
  }
});



module.exports = router;
