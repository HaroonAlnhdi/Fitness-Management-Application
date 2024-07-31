const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Packages = require('../models/packages.js');
const Trainer =require("../models/trainer.js")

router.get('/fitness', async (req, res) => {
    const package = await Packages.find();
    res.render('home/fitness.ejs',{package});
  });



module.exports = router;
