const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');


router.post('/', async (req, res) => {
  try {
    const { plate, type } = req.body;
    const existingVehicles = await Vehicle.find({ type });
    const maxSlots = type === 'car' ? 5 : 10;

    if (existingVehicles.length >= maxSlots) {
      return res.status(400).json({ msg: 'No slots available for this type' });
    }

    const newVehicle = new Vehicle({ plate, type });
    await newVehicle.save();
    res.json(newVehicle);
  } catch (err) {
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
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ msg: 'Vehicle not found' });

    vehicle.entryTime = req.body.entryTime || vehicle.entryTime;
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


const mongoose = require('mongoose');

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
