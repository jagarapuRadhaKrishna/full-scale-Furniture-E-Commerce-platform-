const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');

// Placeholder admin routes
router.get('/dashboard', protect, authorize('admin'), (req, res) => res.json({ success: true, message: 'Admin dashboard' }));
router.get('/users', protect, authorize('admin'), (req, res) => res.json({ success: true, message: 'Get all users' }));
router.get('/orders', protect, authorize('admin'), (req, res) => res.json({ success: true, message: 'Get all orders' }));

module.exports = router;
