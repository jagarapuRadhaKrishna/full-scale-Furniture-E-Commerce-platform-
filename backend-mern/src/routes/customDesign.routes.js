const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// Placeholder routes
router.post('/', protect, (req, res) => res.json({ success: true, message: 'Submit custom design request' }));
router.get('/', protect, (req, res) => res.json({ success: true, message: 'Get custom design requests' }));

module.exports = router;
