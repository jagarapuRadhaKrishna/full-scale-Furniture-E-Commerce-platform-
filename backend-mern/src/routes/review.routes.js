const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// Placeholder routes
router.get('/', protect, (req, res) => res.json({ success: true, message: 'Get reviews' }));
router.post('/', protect, (req, res) => res.json({ success: true, message: 'Create review' }));

module.exports = router;
