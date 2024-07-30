const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const Admin = require('../models/admin.js');

// Render user sign-up page
router.get('/dashboard', (req, res) => {
  res.render('admin/dashbord.ejs');
});

router.get('/members', async (req, res) => {
  const members = await User.find();
  res.render('admin/members.ejs',{members});
});

router.get('/trainers', (req, res) => {
  res.render('admin/trainers.ejs');
});

router.get('/admins', async (req, res) => {
  const admin = await Admin.find();
  res.render('admin/admins.ejs',{admin});
});

router.get('/packages', (req, res) => {
  res.render('admin/packages.ejs');
});



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

module.exports = router;
// /home/klash/code/ga/projects/Fitness-App/views/admin/admins.ejs
// /home/klash/code/ga/projects/Fitness-App/views/admin/edits/editAdmin.ejs