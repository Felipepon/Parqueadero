const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  plate: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['car', 'motorcycle'] },
  Document: { type: String, required: true, enum: ['cedula', 'pasaporte'] },
  NumeroDocument: { type: String, required: true },
  user: { type: String, required: true },
  entryTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
