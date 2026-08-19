const express = require('express');
const router = express.Router();

const REVIEW_SERVICE_URL = process.env.REVIEW_SERVICE_URL || 'https://mohammed-morshedy-shop-sphere-revie.vercel.app';

// Get reviews
router.get('/', async (req, res) => {
  try {
    const response = await fetch(`${REVIEW_SERVICE_URL}/api/reviews${req.url}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews from Microservice' });
  }
});

// Post review
router.post('/', async (req, res) => {
  try {
    const response = await fetch(`${REVIEW_SERVICE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post review to Microservice' });
  }
});

module.exports = router;