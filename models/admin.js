const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  cpr: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
    immutable: true,
    require: false, 
  },
 
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;