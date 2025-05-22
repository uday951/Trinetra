const express = require('express');
const router = express.Router();
const EducationContent = require('../models/EducationContent');

// List all content
router.get('/', async (req, res) => {
  const content = await EducationContent.find();
  res.json(content);
});

// Get articles
router.get('/articles', async (req, res) => {
  try {
    const { userId } = req.query;
    const articles = await EducationContent.find({ type: 'article' });
    res.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

// Get videos
router.get('/videos', async (req, res) => {
  try {
    const { userId } = req.query;
    const videos = await EducationContent.find({ type: 'video' });
    res.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});

// Mark content as read
router.post('/read', async (req, res) => {
  try {
    const { userId, contentId } = req.body;
    // Implement logic to mark content as read (you might need a UserReadContent model)
    res.json({ success: true });
  } catch (error) {
    console.error('Error marking content as read:', error);
    res.status(500).json({ message: 'Failed to mark as read' });
  }
});

// Add content (admin only)
router.post('/', async (req, res) => {
  const { title, type, url, description, tags } = req.body;
  const content = await EducationContent.create({ title, type, url, description, tags });
  res.json(content);
});

module.exports = router; 