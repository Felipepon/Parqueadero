const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  plate: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['car', 'motorcycle'] },
  entryTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
