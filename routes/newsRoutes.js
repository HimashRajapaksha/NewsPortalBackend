const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single news item by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add news
router.post('/add', async (req, res) => {
  const { title, content, imageUrl } = req.body;
  try {
    const newNews = new News({ title, content, imageUrl });
    await newNews.save();
    res.status(201).send(newNews);
  } catch (error) {
    res.status(500).send({ error: 'Error creating news' });
  }
});
// Update news including image
router.put('/update/:id', async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    let updateFields = { title, content };
    if (imageUrl) {
      updateFields.imageUrl = imageUrl;
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete news
router.delete('/delete/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted news' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
