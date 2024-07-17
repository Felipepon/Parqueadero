const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  try {
    const vehicles = req.body;

    if (!Array.isArray(vehicles)) {
      return res.status(400).json({ msg: 'Input data should be an array of vehicles' });
    }

    let carCount = await Vehicle.countDocuments({ type: 'car' });
    let motorcycleCount = await Vehicle.countDocuments({ type: 'motorcycle' });

    const newVehicles = [];
    for (const vehicleData of vehicles) {
      const { plate, type } = vehicleData;
      const maxSlots = type === 'car' ? 5 : 10;
      const currentCount = type === 'car' ? carCount : motorcycleCount;

      if (currentCount >= maxSlots) {
        return res.status(400).json({ msg: `No slots available for ${type}s` });
      }

      newVehicles.push(new Vehicle({ plate, type }));
      if (type === 'car') {
        carCount++;
      } else {
        motorcycleCount++;
      }
    }

    const createdVehicles = await Vehicle.insertMany(newVehicles);
    res.json(createdVehicles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }

    const { plate, type, entryTime } = req.body;
    if (plate) vehicle.plate = plate;
    if (type) vehicle.type = type;
    if (entryTime) vehicle.entryTime = entryTime;

    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    console.error('Error in PUT /:id:', err);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ msg: 'Vehicle not found' });

    await vehicle.deleteOne(); 
    res.json({ msg: 'Vehicle removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
