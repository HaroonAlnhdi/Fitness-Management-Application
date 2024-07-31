const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Packages = require('../models/packages.js');
const Trainer =require("../models/trainer.js")

router.get('/fitness', (req, res) => {
    res.render('home/fitness.ejs');
  });



module.exports = router;
