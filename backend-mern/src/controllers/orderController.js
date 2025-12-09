const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const logger = require('../utils/logger');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      couponCode
    } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order'
      });
    }

    // Calculate pricing
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      if (product.stock.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const price = product.salePrice || product.price;
      subtotal += price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url,
        quantity: item.quantity,
        price: price,
        customization: item.customization
      });

      // Update stock
      product.stock.quantity -= item.quantity;
      product.totalSales += item.quantity;
      await product.save();
    }

    // Calculate totals
    const tax = subtotal * 0.18; // 18% GST
    const shipping = subtotal >= 10000 ? 0 : 500;
    const discount = 0; // Apply coupon logic here
    const total = subtotal + tax + shipping - discount;

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      pricing: {
        subtotal,
        tax,
        shipping,
        discount,
        total
      },
      payment: {
        method: paymentMethod,
        status: 'pending'
      },
      couponCode
    });

    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $set: { items: [] } }
    );

    logger.info(`Order created: ${order.orderNumber} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
    logger.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { user: req.user.id };
    if (status) query.status = status;

    const orders = await Order.find(query)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name slug images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order belongs to user or user is admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.json({
      success: true,
      data: { order }
    });
  } catch (error) {
    logger.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (order.status === 'delivered' || order.status === 'shipped') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel shipped or delivered order'
      });
    }

    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.cancellationReason = cancellationReason;

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 
          'stock.quantity': item.quantity,
          totalSales: -item.quantity
        }
      });
    }

    await order.save();

    logger.info(`Order cancelled: ${order.orderNumber}`);

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order }
    });
  } catch (error) {
    logger.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order'
    });
  }
};
