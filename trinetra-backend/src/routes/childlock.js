const express = require('express');
const router = express.Router();
const SafeAppList = require('../models/SafeAppList');

// Get safe apps
router.get('/safeapps/:userId/:deviceId', async (req, res) => {
  try {
    const list = await SafeAppList.findOne({ userId: req.params.userId, deviceId: req.params.deviceId });
    res.json(list);
  } catch (error) {
    console.error('Error fetching safe apps:', error);
    res.status(500).json({ message: 'Failed to fetch safe apps' });
  }
});

// Set safe apps
router.post('/safeapps', async (req, res) => {
  try {
    const { userId, deviceId, allowedApps } = req.body;
    if (!userId || !allowedApps) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const list = await SafeAppList.findOneAndUpdate(
      { userId, deviceId },
      { allowedApps },
      { upsert: true, new: true }
    );
    res.json(list);
  } catch (error) {
    console.error('Error setting safe apps:', error);
    res.status(500).json({ message: 'Failed to set safe apps' });
  }
});

// Activate lock
router.post('/lock', async (req, res) => {
  try {
    const { userId, deviceId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId parameter' });
    }
    // Device should enforce allowedApps
    res.json({ success: true });
  } catch (error) {
    console.error('Error activating lock:', error);
    res.status(500).json({ message: 'Failed to activate lock' });
  }
});

module.exports = router; 