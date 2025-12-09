const Cart = require('../models/Cart');
const Product = require('../models/Product');
const logger = require('../utils/logger');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    res.json({
      success: true,
      data: { cart }
    });
  } catch (error) {
    logger.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart'
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, customization } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock
    if (product.stock.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.salePrice || product.price,
        customization
      });
    }

    await cart.save();
    await cart.populate('items.product');

    logger.info(`Item added to cart: ${product.name} by user ${req.user.email}`);

    res.json({
      success: true,
      message: 'Item added to cart',
      data: { cart }
    });
  } catch (error) {
    logger.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart'
    });
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/update/:itemId
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity === 0) {
      item.remove();
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Cart updated',
      data: { cart }
    });
  } catch (error) {
    logger.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart'
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: { cart }
    });
  } catch (error) {
    logger.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item'
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      data: { cart }
    });
  } catch (error) {
    logger.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
};
