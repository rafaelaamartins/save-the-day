const mongoose = require('../database');

// creating the incident entity in mongodb
const IncidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ngo',
    required: true,
  },
  creadtedAt: {
    type: Date,
    default: Date.now,
  }
});


const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = Incident;