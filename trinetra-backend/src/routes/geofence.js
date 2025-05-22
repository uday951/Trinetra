const express = require('express');
const router = express.Router();
const GeoFence = require('../models/GeoFence');
const Device = require('../models/Device');

// List geofences
router.get('/:userId/:deviceId?', async (req, res) => {
  try {
    const { userId } = req.params;
    const deviceId = req.params.deviceId || 'default';
    
    const fences = await GeoFence.find({ userId });
    res.json({ geofences: fences });
  } catch (error) {
    console.error('Error fetching geofences:', error);
    res.status(500).json({ message: 'Failed to fetch geofences' });
  }
});

// Add geofence
router.post('/', async (req, res) => {
  try {
    const { userId, name, latitude, longitude, radius, active = true } = req.body;
    if (!userId || !name || latitude === undefined || longitude === undefined || radius === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const center = { lat: latitude, lng: longitude };
    const fence = await GeoFence.create({ 
      userId, 
      deviceId: req.body.deviceId || 'default',
      name,
      center,
      radius,
      active
    });
    
    res.json(fence);
  } catch (error) {
    console.error('Error adding geofence:', error);
    res.status(500).json({ message: 'Failed to add geofence' });
  }
});

// Remove geofence
router.delete('/:userId/:geofenceId', async (req, res) => {
  try {
    const fence = await GeoFence.findOneAndDelete({ 
      userId: req.params.userId, 
      _id: req.params.geofenceId 
    });
    
    if (!fence) {
      return res.status(404).json({ message: 'Geofence not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing geofence:', error);
    res.status(500).json({ message: 'Failed to remove geofence' });
  }
});

// Get device location
router.get('/location/:deviceId', async (req, res) => {
  try {
    const device = await Device.findOne({ deviceId: req.params.deviceId });
    res.json({ location: device?.lastLocation || null });
  } catch (error) {
    console.error('Error fetching device location:', error);
    res.status(500).json({ message: 'Failed to fetch device location' });
  }
});

module.exports = router; 