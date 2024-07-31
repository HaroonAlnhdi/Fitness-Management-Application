const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  specialization: {
    type: String,
    required: false
  },
  experience: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  Picture:{
    type:String,
    required:false,
    default: "https://i.pinimg.com/564x/91/de/10/91de10ef163ed6e82357f70c0ee5e8a5.jpg",

  }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;