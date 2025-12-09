const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrder,
  cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
