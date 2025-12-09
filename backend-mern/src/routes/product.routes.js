const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);
router.get('/slug/:slug', getProductBySlug);
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
