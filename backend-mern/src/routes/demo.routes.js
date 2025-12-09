const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// Placeholder routes
router.post('/', protect, (req, res) => res.json({ success: true, message: 'Book demo' }));
router.get('/', protect, (req, res) => res.json({ success: true, message: 'Get demo bookings' }));

module.exports = router;
