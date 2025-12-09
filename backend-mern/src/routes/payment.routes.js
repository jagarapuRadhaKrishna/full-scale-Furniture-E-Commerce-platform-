const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// Placeholder routes - implement payment controller
router.post('/create-intent', protect, (req, res) => res.json({ success: true, message: 'Create payment intent' }));
router.post('/verify', protect, (req, res) => res.json({ success: true, message: 'Verify payment' }));
router.post('/webhook', (req, res) => res.json({ success: true, message: 'Payment webhook' }));

module.exports = router;
