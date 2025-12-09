const express = require('express');
const router = express.Router();

// Placeholder routes
router.get('/', (req, res) => res.json({ success: true, message: 'Get categories' }));
router.get('/:id', (req, res) => res.json({ success: true, message: 'Get category' }));

module.exports = router;
