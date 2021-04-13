const mongoose = require('../database');

const NgoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  creadtedAt: {
    type: Date,
    default: Date.now,
  }
});

const Ngo = mongoose.model('Ngo', NgoSchema);

module.exports = Ngo;