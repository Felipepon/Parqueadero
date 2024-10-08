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

    const carCount = await Vehicle.countDocuments({ type: 'car' });
    const motorcycleCount = await Vehicle.countDocuments({ type: 'motorcycle' });

    let currentCarCount = carCount;
    let currentMotorcycleCount = motorcycleCount;

    const newVehicles = [];
    const errors = [];

    for (const vehicleData of vehicles) {
      const { plate, type, Document, user, NumeroDocument } = vehicleData;
      const maxSlots = type === 'car' ? 5 : 10;
      const currentCount = type === 'car' ? currentCarCount : currentMotorcycleCount;

      if (NumeroDocument.length < 8 || NumeroDocument.length > 12) {
        errors.push({ msg: 'Usuario no válido', vehicle: vehicleData });
        continue;
      }

      if (currentCount >= maxSlots) {
        errors.push({ msg: `No slots available for ${type}s`, vehicle: vehicleData });
        continue;
      }

      if (type === 'motorcycle' && plate.length > 8) {
        errors.push({ msg: 'Placa no aceptada para motocicletas', vehicle: vehicleData });
        continue;
      }

      if (type === 'car' && plate.length > 6) {
        errors.push({ msg: 'Placa no aceptada para carros', vehicle: vehicleData });
        continue;
      }

      newVehicles.push(new Vehicle({ plate, type, Document, user, NumeroDocument }));

      if (type === 'car') {
        currentCarCount++;
      } else {
        currentMotorcycleCount++;
      }
    }

    if (newVehicles.length > 0) {
      const createdVehicles = await Vehicle.insertMany(newVehicles);
      res.json({ createdVehicles, errors });
    } else {
      res.status(400).json({ errors });
    }
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

    const { plate, type, entryTime, user } = req.body;
    if (plate) vehicle.plate = plate;
    if (type) vehicle.type = type;
    if (entryTime) vehicle.entryTime = entryTime;
    if (user) vehicle.user = user;

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
