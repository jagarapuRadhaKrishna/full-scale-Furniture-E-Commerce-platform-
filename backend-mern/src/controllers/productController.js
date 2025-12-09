const Product = require('../models/Product');
const { cache } = require('../config/redis');
const logger = require('../utils/logger');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      minPrice,
      maxPrice,
      sort = '-createdAt',
      search,
      inStock
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (inStock === 'true') query['stock.quantity'] = { $gt: 0 };
    if (search) {
      query.$text = { $search: search };
    }

    // Check cache
    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const cachedData = await cache.get(cacheKey);

    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    // Execute query
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Product.countDocuments(query);

    const result = {
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    };

    // Cache result
    await cache.set(cacheKey, result, 300); // 5 minutes

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment view count
    product.views += 1;
    await product.save();

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    logger.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.views += 1;
    await product.save();

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    logger.error('Get product by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // Clear cache
    await cache.del('products:*');

    logger.info(`Product created: ${product.name}`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    logger.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create product'
    });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Clear cache
    await cache.del('products:*');

    logger.info(`Product updated: ${product.name}`);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    logger.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Clear cache
    await cache.del('products:*');

    logger.info(`Product deleted: ${product.name}`);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    logger.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      isFeatured: true, 
      isActive: true 
    })
      .populate('category', 'name slug')
      .limit(8)
      .sort('-createdAt');

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    logger.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured products'
    });
  }
};
